import { IsNotEmpty, IsMongoId, IsString } from 'class-validator';

export class CreateOrderCakeDto {
  @IsNotEmpty()
  @IsMongoId()
  cake: string;

  @IsString()
  specialMessage: string;

  colorPreference: string;
  birthdayCard: boolean;
  wine: boolean;
  cakeCount: number;

  @IsNotEmpty()
  grandPrice: number;

  reference: string;
  paymentStatus: boolean;
}
