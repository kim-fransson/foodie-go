export function getImagePath(type, quality = false) {
  const formattedType = type.split(' ').join('-').toLowerCase() + '.jpg'
  const imageImport = `/images/${quality ? 'quality/' : ''}${formattedType}`
  return imageImport
}
