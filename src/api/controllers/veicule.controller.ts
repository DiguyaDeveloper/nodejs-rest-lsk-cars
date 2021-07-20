import { Request, Response } from 'express';
import { ApiError, NotFoundError } from 'src/core/error/ApiError';
import * as veiculeService from '../services/veicule.service';

/**
 * Método para registrar veiculos
 * @param req
 * @param res
 * @returns
 */
const register = async (req: Request, res: Response) => {
  const veicule = await veiculeService.saveOrUpdate(req.body);

  if (veicule) {
    return res.status(201).json(veicule);
  }

  return ApiError.handle(new NotFoundError(), res);
};

/**
 * Método para buscar todos os veiculos
 * @param res
 * @returns
 */
const findAll = async (res: Response) => {
  const veicule = await veiculeService.findAll();

  if (veicule) {
    return res.status(201).json(veicule);
  }

  return ApiError.handle(new NotFoundError(), res);
};

const findOneByPlate = async (req: Request, res: Response) => {
  const veicule = await veiculeService.findOneByPlate(req.body);

  if (veicule) {
    return res.status(201).json(veicule);
  }

  return ApiError.handle(new NotFoundError(), res);
};

export default { register, findAll, findOneByPlate };
