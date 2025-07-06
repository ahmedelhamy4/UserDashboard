import {
  Controller,
  Get,
  Param,
  UseGuards,
  Body,
  Delete,
  Put,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { RolesGuard } from './roles/roles.guard';
import { Roles } from './roles/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllUsers() {
    return this.userService.find({
      select: ['id', 'email', 'role'],
    });
  }

  @Get(':id')
  async findUserById(@Param('id') id: number) {
    return this.userService.findOne({
      where: { id },
      select: ['id', 'email', 'role'],
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.save(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() data: Partial<User>) {
    return this.userService.update(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
