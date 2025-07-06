/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedAdminUser();
  }

  private async seedAdminUser() {
    const existingAdmin = await this.userRepo.findOne({
      where: { email: 'admin@example.com' },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = this.userRepo.create({
        email: 'admin@example.com',

        password: hashedPassword,
        role: 'admin',
      });
      await this.userRepo.save(admin);
      console.log('✅ Default admin user created.');
    } else {
      console.log('ℹ️ Admin user already exists.');
    }
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async validateUser(email: string, plainPassword: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(plainPassword, user.password);
    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async save(data: Partial<User>): Promise<User> {
    const user = this.userRepo.create({
      ...data,
      password: data.password
        ? await bcrypt.hash(data.password, 10)
        : undefined,
    });
    return this.userRepo.save(user);
  }

  async find(options?: FindManyOptions<User>) {
    return this.userRepo.find(options);
  }

  async findOne(options: FindOneOptions<User>) {
    return this.userRepo.findOne(options);
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await this.userRepo.update(id, data);
    const updated = await this.userRepo.findOne({ where: { id } });

    if (!updated) {
      throw new NotFoundException(`User not found`);
    }

    return updated;
  }

  async delete(id: number) {
    return this.userRepo.delete(id);
  }
}
