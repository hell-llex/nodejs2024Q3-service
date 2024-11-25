import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging/logging.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(
    req: Request & { query: any },
    res: Response & { statusCode: number },
    next: NextFunction,
  ) {
    const { method, url, query, body } = req;

    this.loggingService.info('Incoming request', { method, url, query, body });

    const originalEnd = res.end;
    res.end = function (...args: any) {
      this.loggingService.info('Response sent', {
        statusCode: res.statusCode,
        url,
        method,
      });
      originalEnd.apply(res, args);
    }.bind(this);

    next();
  }
}
