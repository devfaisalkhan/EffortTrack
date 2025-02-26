import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CustomConfigurationService } from 'src/shared/config/configuration.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private confifSvc: CustomConfigurationService,
    private authSvc: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: confifSvc.getJwtConfig().secret,
    });
  }

  async validate(payload: any) {
    return this.authSvc.vaildateUserByEmail(payload.email);
  }
}
