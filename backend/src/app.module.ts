import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nestapp',
      entities: [User],
      synchronize: true, // disable in production
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
