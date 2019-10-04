export function formatDate(date, fmt) {
  // YYYY-MM-DD hh:mm:ss
  const rule = {
    '(Y|y)+': date.getFullYear(),
    'M+': padLeftZero(date.getMonth() + 1 + ''),
    '(D|d)+': padLeftZero(date.getDate() + ''),
    'h+': padLeftZero(date.getHours() + ''),
    'm+': padLeftZero(date.getMinutes() + ''),
    's+': padLeftZero(date.getSeconds() + '')
  }
  for (const key in rule) {
    fmt = fmt.replace(new RegExp(key), rule[key])
  }
  return fmt
}

export function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
