const supportedDishesImages = new Set([
  'curry',
  'lasagne',
  'maki',
  'meatballs',
  'pie',
  'salad',
  'soup',
  'steak',
  'stew',
  'chicken',
  'pasta',
  'pork',
  'sauce',
  'skewers',
  'sushi'
])

export function getImagePath(name) {
  const hints = name.split(' ')
  for (let hint of hints) {
    if (supportedDishesImages.has(hint.toLowerCase())) {
      return `/images/dishes/${hint.toLowerCase()}.jpg`
    }
  }

  return '/images/dishes/default.jpg'
}
