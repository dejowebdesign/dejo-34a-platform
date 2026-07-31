import { Injectable } from '@nestjs/common';
import type { JwtService } from '@nestjs/jwt';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /** Infrastructure is ready; credential flows are intentionally not exposed before requirements exist. */
  issueAccessToken(user: AuthenticatedUser): string {
    return this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
  }
}
