import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

export function getImagePath(type, quality = false) {
  const formattedType = type.split(' ').join('-').toLowerCase() + '.jpg'
  const imageImport = `/images/${quality ? 'quality/' : ''}${formattedType}`
  return imageImport
}

export const generateDishes = (min, max) => {
  const numberOfDishes = faker.number.int({ min, max })
  const dishes = []
  for (let i = 0; i < numberOfDishes; i++) {
    const title = faker.food.dish()
    const price = faker.commerce.price({ min: 8, max: 15, symbol: '$' })
    const description = faker.food.description()
    dishes.push({ title, price, description, id: uuidv4() })
  }
  return dishes
}
