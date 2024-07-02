import { NextFunction, Request, Response } from 'express';

export const loggerGlobal = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const currentDate = new Date();
  console.log(
    `Ejecutando metodo ${req.method} en la ruta ${req.url} con fecha y hora local: ${currentDate.toLocaleString()}`,
  );
  next();
};
