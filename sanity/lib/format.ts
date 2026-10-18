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

export function formatTimestamp(seconds?: number): string {
  if (!seconds || seconds <= 0) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(mins)}:${pad(secs)}`
}

