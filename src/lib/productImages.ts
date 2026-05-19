/** Normalize API imageURLs (string | string[]) into a string array */
export function toImageArray(
  imageURLs: string | string[] | undefined | null
): string[] {
  if (!imageURLs) return []
  if (Array.isArray(imageURLs)) return imageURLs.filter(Boolean)
  return [imageURLs]
}

export function getPrimaryImage(
  imageURLs: string | string[] | undefined | null
): string {
  return toImageArray(imageURLs)[0] ?? ''
}
