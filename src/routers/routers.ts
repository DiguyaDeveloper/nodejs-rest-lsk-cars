import { Router } from 'express';
import veicules from './veicule.router';

const router = Router();

router.use('/veicules', veicules);

export default router;
