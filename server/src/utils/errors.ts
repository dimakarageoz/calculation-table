import { HttpException, HttpStatus } from '@nestjs/common';

export const createException = (
    status: HttpStatus,
    message = 'Some errors occurred'
): HttpException => {
    return new HttpException({ status, message }, status)
}
