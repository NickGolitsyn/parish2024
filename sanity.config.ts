import { dataset, projectId } from './sanity/env'
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import {structureTool} from 'sanity/structure'
import { schema, singletonListItem, singletonTypes, singletonActions } from './sanity/schema';

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            singletonListItem(S, 'home'),
            singletonListItem(S, 'about'),
            singletonListItem(S, 'contact'),
            S.documentTypeListItem('news').title('news'),
            S.documentTypeListItem('sundayschool').title('sunday school'),
            S.documentTypeListItem('services').title('services'),
            S.documentTypeListItem('pastevents').title('past events'),
            singletonListItem(S, 'donate'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schema.types,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
