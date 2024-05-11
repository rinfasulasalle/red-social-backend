import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constans/jwt.constant';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // para verificar en endpoint pones auth/ Beaver token
    // console.log(request.headers.authorization);

    //Si no existe el token madas no esta autorizado
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      // request['user'] = payload;
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // el beavker saflaghvija con beaker espacio y luego el token
    //[ Beaver, tosaflaghvijaken]
    const [type, token] = request.headers.authorization?.split(' ') ?? []; // con ? no explota opr undefined

    return type === 'Bearer' ? token : undefined;
  }
}
