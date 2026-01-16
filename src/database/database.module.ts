import { Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from '../entities/organization.entity';
import { User } from '../entities/user.entity';
import { SubscriptionPlan } from '../entities/subscription-plan.entity';
import { Subscription } from '../entities/subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (moduleRef: ModuleRef) => ({
        type: 'postgres',
        host: 'localhost',
        port: 1234,
        username: 'postgres',
        password: '1234',
        database: 'saas_product',
        entities: [Organization, User, SubscriptionPlan, Subscription],
        synchronize: true,
      }),
      inject: [ModuleRef],
    }),
  ],
})
export class DatabaseModule {}