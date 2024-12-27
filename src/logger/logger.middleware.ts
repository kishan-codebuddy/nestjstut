import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    console.log(`[Request] ${method} ${originalUrl} - Body:`, req.body);

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start;
      console.log(`[Response] ${method} ${originalUrl} - Status: ${statusCode} - Duration: ${duration}ms`);
    });

    next();
  }
}
