/**
 * Use export to be accessible in other modules
 */
export class Food{
    //! means required
    //? means optional
    id!:string;
    name!:string;
    price!:number;
    tags?: string[];
    favorite!:boolean;
    stars!: number;
    imageUrl!: string;
    origins!: string[];
    cookTime!:string;
  }