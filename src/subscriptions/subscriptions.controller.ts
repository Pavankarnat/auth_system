import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { SubscriptionPlansService } from './subscription-plans.service';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { TenantGuard } from '../auth/tenant.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('subscription-plans')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubscriptionPlansController {
  constructor(private readonly subscriptionPlansService: SubscriptionPlansService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    return this.subscriptionPlansService.create(createSubscriptionPlanDto);
  }

  @Get()
  findAll() {
    return this.subscriptionPlansService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const plan = await this.subscriptionPlansService.findOne(id);
    if (!plan) {
      throw new NotFoundException('Subscription plan not found');
    }
    return plan;
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateSubscriptionPlanDto: Partial<CreateSubscriptionPlanDto>) {
    return this.subscriptionPlansService.update(id, updateSubscriptionPlanDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.subscriptionPlansService.remove(id);
  }
}

@Controller('organizations/:organizationId/subscriptions')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Param('organizationId') organizationId: string, @Body() createSubscriptionDto: CreateSubscriptionDto) {
    createSubscriptionDto.organizationId = organizationId;
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get()
  findAll(@Param('organizationId') organizationId: string) {
    return this.subscriptionsService.findAllByOrganization(organizationId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const sub = await this.subscriptionsService.findOne(id);
    if (!sub) {
      throw new NotFoundException('Subscription not found');
    }
    return sub;
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateSubscriptionDto: Partial<CreateSubscriptionDto>) {
    return this.subscriptionsService.update(id, updateSubscriptionDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.subscriptionsService.remove(id);
  }
}