import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UserEntity } from './user.entity';
import { hashPwd } from '../utils/hash-pwd';
import {
  CheckUserResponse,
  RegistrationUserResponse,
} from '../types/user/user';

@Injectable()
export class UserService {
  async registration(
    newUser: RegistrationDto,
  ): Promise<RegistrationUserResponse> {
    const userExists = await UserEntity.find({
      where: {
        email: newUser.email,
      },
    });

    if (userExists.length > 0) {
      return {
        message:
          'An account with the email address you entered already exists.',
      };
    }

    const user = new UserEntity();
    user.email = newUser.email;
    user.pwdHash = hashPwd(newUser.pwd);

    await user.save();

    return {
      message: 'Your account has been created!',
    };
  }

  async checkUser(email: string): Promise<CheckUserResponse> {
    const user = await UserEntity.findOne({
      where: {
        email,
      },
    });

    if (!user.currentTokenId || !user) {
      return {
        authorized: false,
      };
    }

    return {
      authorized: true,
    };
  }
}
