// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { LoggingService } from './logging/logging.service';

// @Catch()
// export class HttpExceptionFilter implements ExceptionFilter {
//   constructor(private readonly loggingService: LoggingService) {}

//   catch(exception: Error, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();
//     const request = ctx.getRequest();

//     const status =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;

//     const errorResponse = {
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       message: exception.message,
//     };

//     this.loggingService.log('error', 'Exception caught', {
//       error: exception,
//       request: {
//         url: request.url,
//         method: request.method,
//         body: request.body,
//         query: request.query,
//       },
//     });

//     response.status(status).json(errorResponse);
//   }
// }

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ILogger } from './logging/logger.interface';
import { LoggingService } from './logging/logging.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.loggingService.error('Exception caught', {
      exception: exception instanceof Error ? exception.message : exception,
      stack: exception instanceof Error ? exception.stack : undefined,
      path: request.url,
      method: request.method,
    });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        status === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Internal server error'
          : exception instanceof Error
          ? exception.message
          : 'Unknown error',
    });
  }
}
