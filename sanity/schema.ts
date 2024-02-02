import { type SchemaTypeDefinition } from 'sanity'
import foodItems from './schemas/foodItems'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [foodItems],
}
