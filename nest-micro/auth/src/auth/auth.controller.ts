import { Controller, UseGuards, Post, Request, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { AuthCheckDTO } from './dtos';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Request() req: ExpressRequest) {
    return this.authService.login(req.user);
  }

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async loggedIn(data: AuthCheckDTO) {
    try {
      const res = this.authService.validateToken(data.jwt);

      return res;
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
}
