export function whitespaceRemover(data) {
  return data.replace(/ /g, '')
}

export function listSorter(data) {
  return data.sort((a, b) => a.id - b.id)
}

export function getRequiredFields(data, fields) {
  return data.filter(item=> item)
}

export function formatNumForSubmit(num) {
  return Number(num.replace(/ /g, ''))
}
