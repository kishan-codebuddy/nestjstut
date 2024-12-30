import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create.book.dto';


@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post('create')
    async create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.create(createBookDto);
    }

}
