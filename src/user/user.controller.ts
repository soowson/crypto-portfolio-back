import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegistrationDto } from './dto/registration.dto';
import {
  CheckUserResponse,
  RegistrationUserResponse,
} from '../types/user/user';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Post('/registration')
  registration(
    @Body() newUser: RegistrationDto,
  ): Promise<RegistrationUserResponse> {
    return this.userService.registration(newUser);
  }

  @Get('/:email')
  checkUser(@Param('email') email: string): Promise<CheckUserResponse> {
    return this.userService.checkUser(email);
  }
}
