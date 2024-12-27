import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust the path as necessary


@Injectable()
export class AuthorService {
    constructor(private prisma: PrismaService) {}

    async register(createAuthorDto: CreateAuthorDto) {
        const hashedPassword = await bcrypt.hash(createAuthorDto.password, 10);

        return this.prisma.author.create({
        data: {
            ...createAuthorDto,
            password: hashedPassword,
        },
        });
    }
}
