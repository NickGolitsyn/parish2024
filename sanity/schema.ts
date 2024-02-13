import { type SchemaTypeDefinition } from 'sanity'
import foodItems from './schemas/foodItems'
import services from './schemas/services'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [foodItems, services],
}
