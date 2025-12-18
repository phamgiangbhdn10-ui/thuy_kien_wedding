/**
 * Cloudinary helper functions
 * 
 * This utility converts local image paths to Cloudinary URLs
 * 
 * Environment variables needed:
 * - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: Your Cloudinary cloud name
 * 
 * Usage:
 * import { getCloudinaryImageUrl } from '@/lib/cloudinary'
 * const imageUrl = getCloudinaryImageUrl('/images/15x21/DSC00869.jpg')
 */

import { getCloudinaryFilename } from './cloudinary-mapping'

// Cache cloud name to ensure consistency between server and client
// NEXT_PUBLIC_ prefix means it's available on both server and client
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''

function getCloudName(): string {
  return CLOUD_NAME
}

/**
 * Convert local image path to Cloudinary URL
 * @param localPath - Local path like '/images/15x21/DSC00869.jpg' or '/lehoi/i_1.JPG'
 * @param options - Cloudinary transformation options
 * @returns Cloudinary URL or local path if Cloudinary is not configured
 */
export function getCloudinaryImageUrl(
  localPath: string,
  options?: {
    width?: number
    height?: number
    quality?: number | 'auto'
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
    crop?: 'fill' | 'fit' | 'scale' | 'thumb'
    gravity?: 'auto' | 'center' | 'face'
  }
): string {
  const cloudName = getCloudName()
  
  // If Cloudinary is not configured, return local path for Next.js to handle
  if (!cloudName) {
    return localPath
  }

  // Get Cloudinary filename from mapping (all images are in root folder)
  const imagePath = getCloudinaryFilename(localPath)

  // Build transformation string
  const transformations: string[] = []

  if (options?.width) transformations.push(`w_${options.width}`)
  if (options?.height) transformations.push(`h_${options.height}`)
  if (options?.crop) transformations.push(`c_${options.crop}`)
  if (options?.gravity) transformations.push(`g_${options.gravity}`)
  
  // Only add quality/format if explicitly provided or in options
  if (options?.quality) {
    transformations.push(`q_${options.quality}`)
  }
  if (options?.format) {
    transformations.push(`f_${options.format}`)
  }

  const transformationString = transformations.join(',')
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`

  if (transformationString) {
    return `${baseUrl}/${transformationString}/${imagePath}`
  }

  return `${baseUrl}/${imagePath}`
}

/**
 * Get optimized Cloudinary URL for Next.js Image component
 * Returns base URL without transformations - Next.js will handle optimizations
 */
export function getCloudinaryImageSrc(localPath: string): string {
  // Return base URL without transformations, let Next.js handle optimization
  return getCloudinaryImageUrl(localPath)
}

/**
 * Get Cloudinary URL for background images (full quality for announcement)
 */
export function getCloudinaryBackgroundUrl(localPath: string): string {
  // Return base URL without transformations for full quality
  return getCloudinaryImageUrl(localPath)
}

