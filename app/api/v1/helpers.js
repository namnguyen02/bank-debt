export function transformToQuery(data) {
  return Object.entries(data)
    .map(([key, value]) => {
      if (key === '') {
        return value.join(', ')
      } else {
        return `${key} (${value.join(', ')})`
      }
    })
    .join(', ')
}
