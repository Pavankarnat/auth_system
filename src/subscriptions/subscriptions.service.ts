import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    const subscription = this.subscriptionRepository.create(createSubscriptionDto);
    return this.subscriptionRepository.save(subscription);
  }

  async findAllByOrganization(organizationId: string): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      where: { organizationId },
      relations: ['plan'],
    });
  }

  async findOne(id: string): Promise<Subscription | null> {
    return this.subscriptionRepository.findOne({
      where: { id },
      relations: ['organization', 'plan'],
    });
  }

  async update(id: string, updateSubscriptionDto: Partial<CreateSubscriptionDto>): Promise<Subscription> {
    await this.subscriptionRepository.update(id, updateSubscriptionDto);
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }
}