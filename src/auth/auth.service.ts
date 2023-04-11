import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Response } from 'express';
import { UserEntity } from '../user/user.entity';
import { hashPwd } from '../utils/hash-pwd';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(
      payload,
      'sadasidfhlnas dlsajodasj43 $#$#$% QwSDA A@# @#$@SDFDSR @# %@#% @# RWEFSDFd',
      { expiresIn },
    );

    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: UserEntity): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await UserEntity.findOne({
        where: {
          currentTokenId: token,
        },
      });
    } while (!!userWithThisToken);

    user.currentTokenId = token;
    await user.save();

    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await UserEntity.findOne({
        where: {
          email: req.email,
          pwdHash: hashPwd(req.pwd),
        },
      });

      if (!user) {
        return res.json({ error: 'Invalid email or password.' });
      }

      const token = await this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .json({
          ok: true,
          token: token.accessToken,
          email: user.email,
        });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  async logout(user: UserEntity, res: Response) {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      });

      return res.json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}
