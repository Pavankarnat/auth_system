import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionPlan } from '../entities/subscription-plan.entity';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';

@Injectable()
export class SubscriptionPlansService {
  constructor(
    @InjectRepository(SubscriptionPlan)
    private subscriptionPlanRepository: Repository<SubscriptionPlan>,
  ) {}

  async create(createSubscriptionPlanDto: CreateSubscriptionPlanDto): Promise<SubscriptionPlan> {
    const plan = this.subscriptionPlanRepository.create(createSubscriptionPlanDto);
    return this.subscriptionPlanRepository.save(plan);
  }

  async findAll(): Promise<SubscriptionPlan[]> {
    return this.subscriptionPlanRepository.find();
  }

  async findOne(id: string): Promise<SubscriptionPlan | null> {
    return this.subscriptionPlanRepository.findOne({ where: { id } });
  }

  async update(id: string, updateSubscriptionPlanDto: Partial<CreateSubscriptionPlanDto>): Promise<SubscriptionPlan> {
    await this.subscriptionPlanRepository.update(id, updateSubscriptionPlanDto);
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.subscriptionPlanRepository.delete(id);
  }
}