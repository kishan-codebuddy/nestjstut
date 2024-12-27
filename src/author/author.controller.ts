import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthLoginDto } from './dto/author.login.dto';

@Controller('author')
export class AuthorController {
    constructor(private readonly authService: AuthorService) {}

    @Post('register')
    async register(@Body() createAuthorDto: CreateAuthorDto) {
        return this.authService.register(createAuthorDto);
    }

    @Post('login')
    async login(@Body() authLoginDto: AuthLoginDto){
        const author = await this.authService.validateAuthor(authLoginDto.email, authLoginDto.password);

        if (!author) {
            throw new UnauthorizedException();
        }
        return this.authService.login(author);
    }
}
