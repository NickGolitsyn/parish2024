import Image from "next/image";

type SanityBase = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

interface FoodItems extends SanityBase {
  _type: "foodItems";
  name: string;
  image: Image;
  rating: number;
  tags: string[];
}

interface Services extends SanityBase {
  _type: "services";
  date: date;
  description: { en: string; ro: string };
  bibleReadings: { en: string; ro: string };
  fastingCode: string;
}