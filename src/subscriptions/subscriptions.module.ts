import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPlansService } from './subscription-plans.service';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionPlansController, SubscriptionsController } from './subscriptions.controller';
import { SubscriptionPlan } from '../entities/subscription-plan.entity';
import { Subscription } from '../entities/subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPlan, Subscription])],
  controllers: [SubscriptionPlansController, SubscriptionsController],
  providers: [SubscriptionPlansService, SubscriptionsService],
})
export class SubscriptionsModule {}