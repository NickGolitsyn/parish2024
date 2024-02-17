import { type SchemaTypeDefinition } from 'sanity'
import services from './schemas/services'
import about from './schemas/about'
import contact from './schemas/contact'
import gallery from './schemas/gallery'
import donate from './schemas/donate'
import home from './schemas/home'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [home, about, contact, services, gallery, donate],
}
