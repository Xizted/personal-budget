/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';
import { Request, Response } from 'express';
import { ZodError } from 'zod';
import ERROR_HANDLER from './errors/Error';
import PRISMA_ERROR_HANDLER from './errors/PrismaError';

type PrismaError =
  | PrismaClientKnownRequestError
  | PrismaClientValidationError
  | PrismaClientKnownRequestError
  | PrismaClientValidationError;

export default (
  error: Error | PrismaError | ZodError,
  _: Request,
  res: Response
) => {
  let handler = undefined;
  if (error instanceof PrismaClientKnownRequestError) {
    handler =
      PRISMA_ERROR_HANDLER[error.code] || PRISMA_ERROR_HANDLER['DEFAULT_ERROR'];
    handler(error, res);
  } else if (error instanceof PrismaClientValidationError) {
    const start = error.message.search('Argument');
    const end = error.message.search('missing.');
    const message = error.message.slice(start, end + 7);

    res.status(422).send({ error: message });
  } else if (error instanceof ZodError) {
    res.status(422).send({ error: error.issues });
  } else {
    handler = ERROR_HANDLER[error.name] || ERROR_HANDLER['DEFAULT_ERROR'];
    handler(error, res);
  }
};
