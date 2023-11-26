import { IsNotEmpty, IsEnum } from 'class-validator';
import { CakeCategories } from 'src/Shared/categoriesEnum';

export class CreateNewCakeDto {
  @IsNotEmpty()
  cakeName: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty({ message: 'Please upload an image sample of the cake'})
  imageURL: string;

  @IsNotEmpty()
  minPrice: number;

  @IsNotEmpty()
  maxPrice: number;

  @IsNotEmpty()
  @IsEnum(CakeCategories)
  category: CakeCategories;
}
