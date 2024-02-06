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