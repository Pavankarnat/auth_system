import { IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class CreateSubscriptionPlanDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsObject()
  features: object;
}