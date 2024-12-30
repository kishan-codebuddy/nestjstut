import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './test.controller';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';


describe('TestController', () => {
  let controller: TestController;
  let app: INestApplication;

  
  beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
          controllers: [TestController],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
  });

afterAll(async () => {
    await app.close();
});

  it('should be defined', () => {
    const controller = app.get<TestController>(TestController);
    expect(controller).toBeDefined();
  });
  it('/hello [GET] should return 200 and "Hello World"', () => {
    return request(app.getHttpServer())
        .get('/hello')
        .expect(200)
        .expect('Hello World');
  });

  it('/hello [POST] should return 200 and "Hello {username}" if username is provided', () => {
      return request(app.getHttpServer())
          .post('/hello')
          .send({ username: 'John' })
          .expect(201)
          .expect('Hello John');
  });

  it('/hello [POST] should return 400 if username is not provided or empty', () => {
      return request(app.getHttpServer())
          .post('/hello')
          .send({ username: '' })
          .expect(400);
  });

  it('/hello/:username [GET] should return 200 and "Hello {username}" if username is valid', () => {
      return request(app.getHttpServer())
          .get('/hello/John')
          .expect(200)
          .expect('Hello John');
  });
});
