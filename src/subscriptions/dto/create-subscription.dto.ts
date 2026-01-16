import { IsUUID, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { SubscriptionStatus } from '../../entities/subscription.entity';

export class CreateSubscriptionDto {
  @IsUUID()
  organizationId: string;

  @IsUUID()
  planId: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus;
}