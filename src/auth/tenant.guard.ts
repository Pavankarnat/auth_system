import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: any = context.switchToHttp().getRequest();
    const user = request.user;
    const organizationId = request.params.organizationId || request.body.organizationId || request.query.organizationId;

    if (user.organizationId !== organizationId) {
      throw new ForbiddenException('Access denied: Invalid tenant');
    }
    return true;
  }
}