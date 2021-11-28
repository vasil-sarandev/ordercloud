export const toReadableDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  const readableDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })}`
  return readableDate
}
