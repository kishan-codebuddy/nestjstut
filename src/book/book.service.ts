import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust the path as necessary
import { CreateBookDto } from './dto/create.book.dto';


@Injectable()
export class BookService {
    constructor(private prisma: PrismaService) {}

    async create(createBookDto: CreateBookDto) {
        return this.prisma.book.create({
            data: {
                ...createBookDto,
            },
        });
    }

    
}
