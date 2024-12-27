import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust the path as necessary
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class AuthorService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async register(createAuthorDto: CreateAuthorDto) {
        const hashedPassword = await bcrypt.hash(createAuthorDto.password, 10);

        return this.prisma.author.create({
        data: {
            ...createAuthorDto,
            password: hashedPassword,
        },
        });
    }

    async validateAuthor(email: string, password: string) {
        const author = await this.prisma.author.findUnique({ where: { email } });
        if (author && (await bcrypt.compare(password, author.password))) {
          return author;
        }
        return null;
      }
    
      async login(author: any) {
        const payload = { email: author.email, sub: author.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
