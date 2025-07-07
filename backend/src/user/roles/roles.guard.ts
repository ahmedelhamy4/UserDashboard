import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user.service';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as { userId?: number; id?: number } | undefined;
    if (!user) return false;
    const userId = typeof user.userId === 'number' ? user.userId : user.id;
    if (!userId) return false;

    const dbUser = await this.userService.findOne({
      where: { id: userId },
    });
    if (!dbUser) return false;

    return requiredRoles.includes(dbUser.role);
  }
}
