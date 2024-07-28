import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as PrismaUser } from '@prisma/client';

type User = Omit<PrismaUser, 'password'>;

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getLoginUser(@Req() req: Request): User {
    const user = req.user as User;
    return user;
  }

  @Patch()
  updateUser(@Req() req: Request, @Body() dto: UpdateUserDto): Promise<User> {
    const user = req.user as User;
    return this.userService.updateUser(user.id, dto);
  }
}
