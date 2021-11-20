import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class FallbackExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any;
}
