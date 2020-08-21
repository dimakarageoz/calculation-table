import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.headers['auth-token']

        return !!(token && token === 'Secret-admin-key');
    }
}
