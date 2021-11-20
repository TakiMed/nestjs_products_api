import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ValidationException } from './validation.exception';
export declare class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost): any;
}
