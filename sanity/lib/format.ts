/**
 * Pure format utilities for durations and display values.
 * Safe to import from both Server Components and Client Components.
 */

export function formatDuration(seconds?: number): string {
  if (!seconds || seconds <= 0) return '0m'
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`.trim()
  }
  return `${minutes}m`
}
