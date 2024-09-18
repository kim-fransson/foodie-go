import { faker } from '@faker-js/faker'
import { createServer, Model, Factory } from 'miragejs'

export function makeServer({ environment = 'test' }) {
  return createServer({
    environment,
    models: {
      restaurant: Model
    },
    routes() {
      this.namespace = 'api'
      this.get('/restaurants')
      this.get('/restaurants/:id')
    },
    seeds(server) {
      server.createList('restaurant', 100)
    },
    factories: {
      restaurant: Factory.extend({
        name: () => {
          const animalType = faker.animal.type() // Get a random animal type
          const adjective = faker.food.adjective()

          const animalMap = {
            bear: faker.animal.bear,
            bird: faker.animal.bird,
            cat: faker.animal.cat,
            cetacean: faker.animal.cetacean,
            cow: faker.animal.cow,
            crocodilia: faker.animal.crocodilia,
            dog: faker.animal.dog,
            fish: faker.animal.fish,
            horse: faker.animal.horse,
            insect: faker.animal.insect,
            lion: faker.animal.lion,
            rabbit: faker.animal.rabbit,
            rodent: faker.animal.rodent,
            snake: faker.animal.snake
          }

          const getAnimal = animalMap[animalType]
          const specificAnimal =
            getAnimal && typeof getAnimal === 'function' ? getAnimal() : animalType

          return `the ${adjective} ${specificAnimal}`
        },
        types: () =>
          faker.helpers.arrayElements(
            [
              'asian',
              'breakfast',
              'burger',
              'dessert',
              'fast food',
              'healthy',
              'ice cream',
              'indian',
              'italian',
              'korean',
              'pizza',
              'seafood',
              'sushi',
              'vegan'
            ],
            { min: 1, max: 2 }
          ),
        rating: () => faker.number.float({ multipleOf: 0.5, min: 0, max: 5 }),
        numberOfReviews: () => faker.number.int({ min: 10, max: 999 }),
        distance: () => faker.number.float({ multipleOf: 0.1, min: 0.1, max: 10 }),
        address: () => faker.location.streetAddress(),
        deliveryFee: () => faker.commerce.price({ min: 0, max: 5, dec: 1 }),
        isOpen: () => faker.datatype.boolean(0.8)
      })
    }
  })
}
