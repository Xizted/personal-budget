/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

type PrismaError = PrismaClientKnownRequestError | PrismaClientValidationError;

type PrismaErrorHandler = {
  [key: string]: (error: PrismaClientKnownRequestError, res: Response) => void;
};

type ErroHandler = {
  [key: string]: (error: Error, res: Response) => void;
};

const ERROR_HANDLER: ErroHandler = {
  PASSWORD_NOT_SEND: (error: Error, res: Response) => {
    res.status(422).send({ error: error.message });
  },
  DEFAULT_ERROR: (error: Error, res: Response) => {
    res.status(500).send({ error: error.message, name: error.name });
  },
};

const PRISMA_ERROR_HANDLER: PrismaErrorHandler = {
  P2002: (error: PrismaClientKnownRequestError, res: Response) => {
    const field: string | unknown =
      error.meta?.target !== undefined ? error.meta.target : '';

    res.status(400).send({
      error: `The ${field} field must be unique`,
    });
  },

  P2025: (error: PrismaClientKnownRequestError, res: Response) => {
    const message: string | unknown =
      error.meta?.cause !== undefined ? error.meta.cause : '';

    res.status(404).send({
      error: message,
    });
  },

  DEFAULT_ERROR: (error: PrismaClientKnownRequestError, res: Response) => {
    console.log('owo');
    res.status(500).send({ error: error.message, name: error.name });
  },
};

export default (
  error:
    | Error
    | PrismaError
    | PrismaClientKnownRequestError
    | PrismaClientValidationError
    | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
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
