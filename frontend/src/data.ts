import { Food } from "./app/shared/models/Food";
import { Tag } from './app/shared/models/Tag';
import { SelectConfig } from './app/shared/models/SelectConfig';
import { RadioConfig } from "./app/shared/models/RadioConfig";

export const sample_food: Food[] = [
    {
        id:'1',
        name: 'Pizza Pepperoni',
        cookTime: '10-20',
        price: 10,
        favorite: false,
        origins: ['italy'],
        stars: 4.5,
        imageUrl: 'assets/food-1.jpeg',
        tags: ['FastFood', 'Pizza', 'Lunch'],
        status: 1
      },
      {
        id:'2',
        name: 'Meatball',
        price: 20,
        cookTime: '20-30',
        favorite: true,
        origins: ['persia', 'middle east', 'china'],
        stars: 4.7,
        imageUrl: 'assets/food-2.jpeg',
        tags: ['SlowFood', 'Lunch'],
        status: 1
      },
      {
        id:'3',
        name: 'Hamburger',
        price: 5,
        cookTime: '10-15',
        favorite: false,
        origins: ['germany', 'us'],
        stars: 3.5,
        imageUrl: 'assets/food-3.jpeg',
        tags: ['FastFood', 'Hamburger'],
        status: 1
      },
      {
        id:'4',
        name: 'Fried Potatoes',
        price: 2,
        cookTime: '15-20',
        favorite: true,
        origins: ['belgium', 'france'],
        stars: 3.3,
        imageUrl: 'assets/food-4.jpeg',
        tags: ['FastFood', 'Fry'],
        status: 1
      },
      {
        id:'5',
        name: 'Chicken Soup',
        price: 11,
        cookTime: '40-50',
        favorite: false,
        origins: ['india', 'asia'],
        stars: 3.0,
        imageUrl: 'assets/food-5.jpeg',
        tags: ['SlowFood', 'Soup'],
        status: 1
      },
      {
        id:'6',
        name: 'Vegetables Pizza',
        price: 9,
        cookTime: '40-50',
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: 'assets/food-6.jpeg',
        tags: ['FastFood', 'Pizza', 'Lunch'],
        status: 1
      },
];

export const sample_tags:Tag[] = [
  { name: 'All', count: 6 },
  { name: 'FastFood', count: 4 },
  { name: 'Pizza', count: 2 },
  { name: 'Lunch', count: 3 },
  { name: 'SlowFood', count: 2 },
  { name: 'Hamburger', count: 1 },
  { name: 'Fry', count: 1 },
  { name: 'Soup', count: 1 },
];

export const statuses: SelectConfig[] = [
  { id: 1, name: 'Active' },
  { id: 2, name: 'Inactive' },
];

export const radioFavorites: RadioConfig[] = [
  { name: 'favorite', value: 'true', label: 'Favorite' },
  { name: 'favorite', value: 'false', label: 'Not Favorite' },
];