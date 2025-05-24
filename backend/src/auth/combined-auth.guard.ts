import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ROLES_KEY } from './roles.decorator';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class CombinedAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;
    const path = req.url as string;

    if (path.startsWith('/webhook')) {
      return true;
    }

    if (path.startsWith('/auth/')) {
      return true;
    }

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authorization.split(' ')[1];
    let payload: any;

    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (requiredRoles && requiredRoles.length > 0) {
      if (!requiredRoles.includes(req.user.role)) {
        throw new ForbiddenException('Insufficient permissions');
      }
    }

    return true;
  }
}
