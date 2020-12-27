import { Controller, UseGuards, Post, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Request() req: ExpressRequest) {
    return this.authService.login(req.user);
  }
}
