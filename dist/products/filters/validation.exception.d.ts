import { BadRequestException } from '@nestjs/common';
export declare class ValidationException extends BadRequestException {
    validationErrors: string[] | string;
    constructor(validationErrors: string[] | string);
}
