/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Response } from 'express';

type PrismaErrorHandler = {
  [key: string]: (error: PrismaClientKnownRequestError, res: Response) => void;
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

export default PRISMA_ERROR_HANDLER;
