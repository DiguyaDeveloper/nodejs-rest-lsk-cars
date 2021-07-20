import { Veicule } from '../models/Veicule.model';
import { getConnection } from 'typeorm';

const saveOrUpdate = async (veicule: Veicule): Promise<Veicule | null> => {
  const repo = getConnection().getRepository<Veicule>(Veicule);

  try {
    const save = await repo.save(veicule);
    return save;
  } catch (error) {
    return null;
  }
};

const findAll = async (): Promise<Veicule[] | null> => {
  const repo = getConnection().getRepository<Veicule>(Veicule);

  try {
    const veiculeFinded = await repo.find();
    return veiculeFinded;
  } catch (error) {
    return null;
  }
};

const findOneByPlate = async (req: Veicule): Promise<Veicule | null> => {
  const repo = getConnection().getRepository<Veicule>(Veicule);

  try {
    const veiculeFinded = await repo.findOne({
      where: {
        proprietary: req.proprietary,
        plate: req.plate,
      },
    });
    return veiculeFinded;
  } catch (error) {
    return null;
  }
};

export { saveOrUpdate, findAll, findOneByPlate };
