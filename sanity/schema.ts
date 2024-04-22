import services from './schemas/services';
import about from './schemas/about';
import contact from './schemas/contact';
import gallery from './schemas/gallery';
import donate from './schemas/donate';
import home from './schemas/home';
import news from './schemas/news';
import sundayschool from './schemas/sundayschool';

export const schema: { types: any[] } = {
  types: [home, news, about, contact, services, gallery, donate, sundayschool],
};

// Add these lines to your schema.ts file
export const singletonActions = new Set(["publish", "discardChanges", "restore"]);
export const singletonTypes = new Set(["home", "about", "contact", "donate"]);

export const singletonListItem = (S: any, typeName: string, title = typeName) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName)
    );
