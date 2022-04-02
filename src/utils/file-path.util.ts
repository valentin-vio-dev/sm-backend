import { Request } from 'express';

export default (req: Request, file: Express.Multer.File) => {
  return `${req.protocol}://${req.get('Host')}/images/${file.filename}`;
};
