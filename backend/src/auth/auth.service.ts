import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<string> {

    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email already in use');


    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
    data: {
      email: dto.email,
      passwordHash,
      name: dto.name,
      role: 'user',
      profile: {
        create: {
          avatarUrl: '',
          bio: '',
          phone: '',
          address: '',
        },
      },
    },
  });

  const payload = { sub: user.id, email: user.email, role: user.role };
  return this.jwtService.sign(payload);
  }

  async login(dto: LoginDto): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');


    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
}
