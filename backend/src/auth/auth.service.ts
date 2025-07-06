import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return this.userService.validateUser(email, password);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: CreateUserDto) {
    const existing = await this.userService.findByEmail(dto.email);
    if (existing) {
      return { message: 'User already exists' };
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hashedPassword: string = await bcrypt.hash(dto.password, 10);

    const user: Partial<User> = {
      email: dto.email,
      password: hashedPassword,
      role: 'user',
    };
    const created = await this.userService['userRepo'].save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...result } = created;
    return result;
  }
}
