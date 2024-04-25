import Image from "next/image";

type SanityBase = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

interface HomePage extends SanityBase {
  _type: "home";
  slideshow: Image[];
  welcomeText: { en: string; ro: string };
}

interface About extends SanityBase {
  _type: "about";
  parish: { en: string; ro: string };
  saints: { en: string; ro: string };
}

interface Contact extends SanityBase {
  _type: "contact";
  contact: { en: string; ro: string };
  email: string;
  tel: string;
  visit: { en: string; ro: string };
  address: string;
}

interface Services extends SanityBase {
  _type: "services";
  date: date;
  description: { en: string; ro: string };
  bibleReadings: { en: string; ro: string };
  fastingCode: string;
}

interface SanityGallery extends SanityBase {
  _type: "gallery";
  image: Image;
  width: number;
  height: number;
  alt: { en: string; ro: string };
}

interface News extends SanityBase {
  _type: "news";
  title: { en: string; ro: string };
  description: { en: string; ro: string };
  content: { en: block; ro: block };
  imagedata: { image: Image; alt: { en: string; ro: string }; };
  button: Boolean;
}

interface Donate extends SanityBase {
  _type: "donate";
  donateDesc: { en: string; ro: string };
  link: string;
}