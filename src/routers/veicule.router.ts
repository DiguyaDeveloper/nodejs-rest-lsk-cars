import express, { Request, Response } from 'express';
import { BadRequestError } from '../core/error/ApiError';
import asyncHandler from '../core/utils/asyncHandler';
import UserController from '../api/controllers/veicule.controller';

const veiculeRouter = express.Router();

veiculeRouter.post(
  'register',
  asyncHandler(async (req: Request, res: Response) => {
    console.log('adoro');
    if (!req) throw new BadRequestError('Bad request');
    return await UserController.register(req, res);
  })
);

veiculeRouter.get(
  'find',
  asyncHandler(async (req: Request, res: Response) => {
    return await UserController.findAll(res);
  })
);

export default veiculeRouter;
