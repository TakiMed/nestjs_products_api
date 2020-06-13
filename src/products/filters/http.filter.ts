import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(JSON.stringify(exception));
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    return res.status(exception.getStatus()).json({
      status: exception.getStatus(),
      createdBy: 'HttpExceptionFilter',
      errorMsg: exception.message,
    });
  }
}
