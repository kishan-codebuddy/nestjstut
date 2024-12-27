import { Body, Controller, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('author')
export class AuthorController {
    constructor(private readonly authService: AuthorService) {}

    @Post('register')
    async register(@Body() createAuthorDto: CreateAuthorDto) {
        return this.authService.register(createAuthorDto);
    }
}
