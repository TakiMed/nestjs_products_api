import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';

export class FallbackExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    return res.status(500).json({
      statusCode: 500,
      createdBy: 'FallbackExceptionFilter',
      errorMsg: exception.message
        ? exception.message
        : 'Unexpected error ocurred',
    });
  }
}
