import { resolve, relative, isAbsolute } from 'node:path';
import { logger } from './logger.js';

/**
 * Validate that a path is within the allowed root directory.
 * Prevents path traversal vulnerabilities (C-1).
 *
 * @param path - The path to validate
 * @param allowedRoot - The root directory that the path must be within (default: process.cwd())
 * @param toolName - Name of the tool for logging purposes
 * @throws Error if path traversal is detected
 */
export function validatePath(path: string, allowedRoot: string = process.cwd(), toolName: string = 'unknown'): string {
  const absolutePath = resolve(path);
  const absoluteRoot = resolve(allowedRoot);

  const relativePath = relative(absoluteRoot, absolutePath);

  // Path is inside if it doesn't start with '..' and is not an absolute path (which relative() returns if on different drives on Windows)
  const isInside = !relativePath.startsWith('..') && !isAbsolute(relativePath);

  // Also allow the root directory itself
  if (!isInside && absolutePath !== absoluteRoot) {
    logger.error('SECURITY', `Path traversal attempt blocked in ${toolName}`, {
      requestedPath: path,
      resolvedPath: absolutePath,
      allowedRoot: absoluteRoot
    });
    throw new Error(`Security Error: Access to path "${path}" is outside the allowed project directory.`);
  }

  return absolutePath;
}
