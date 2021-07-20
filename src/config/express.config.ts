import express, { Request, Response } from 'express';
import { getLogger } from './logger.config';
import bodyParser from 'body-parser';
import cors from 'cors';
import { env } from '../env';
import router from '../routers/routers';
import { ApiError, InternalError, NotFoundError } from '../core/error/ApiError';
import { swagger } from './swagger.config';

const app = express();

const logger = getLogger(__filename);

export async function start() {
  try {
    logger.info('Starting http server');

    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(
      bodyParser.urlencoded({
        limit: '10mb',
        extended: true,
        parameterLimit: 50000,
      })
    );
    app.use(cors({ origin: env.app.cors, optionsSuccessStatus: 200 }));

    // Routes
    app.use('/v1', router);

    // catch 404 and forward to error handler
    app.use((req, res, next) => next(new NotFoundError()));

    // Middleware Error Handler
    app.use((err: Error, req: Request, res: Response) => {
      console.log(env.node);
      if (err instanceof ApiError) {
        return ApiError.handle(err, res);
      } else {
        if (env.node === 'development') {
          logger.error(err);
          return res.status(500).send(err.message);
        }
        return ApiError.handle(new InternalError(), res);
      }
    });

    await swagger(router);

    await listen(app);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

async function listen(app: any): Promise<void> {
  return new Promise((resolve) => {
    app
      .listen(env.app.port, () => {
        logger.info(`started on http://localhost:${env.app.port}/v1`);
        logger.info(`Http server started. Listening on port ${env.app.port}`);
        logger.info(`started on ${env.node}`);
        resolve();
      })
      .on('error', (e) => logger.error(e));
  });
}
