import { Response } from 'express';

type ErroHandler = {
  [key: string]: (error: Error, res: Response) => void;
};

const ERROR_HANDLER: ErroHandler = {
  DEFAULT_ERROR: (error: Error, res: Response) => {
    res.status(500).send({ error: error.message, name: error.name });
  },
};

export default ERROR_HANDLER;
