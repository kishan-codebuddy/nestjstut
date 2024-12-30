// src/hello/hello.controller.ts
import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';

@Controller('hello')
export class TestController {
    @Get()
    getHello(): string {
        return 'Hello World';
    }

    @Post()
    postHello(@Body('username') username: string): string {
        if (!username) {
            throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
        }
        return `Hello ${username}`;
    }

    @Get(':username')
    getHelloByUsername(@Param('username') username: string): string {
        if (!username) {
            console.log('inside',username);
            throw new HttpException('Username is required', 400);
        }
        return `Hello ${username}`;
    }
}