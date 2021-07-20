import { getLogger } from './config/logger.config';
import { start as startHttpServer } from './config/express.config';
import { connect as connectDb } from './config/database/database.config';
import { env } from './env';

const logger = getLogger(__filename);

process.on('uncaughtException', (e) => {
  logger.error(e);
  process.exit(1);
});

process.on('exit', (code) => {
  logger.log(code === 0 ? 'info' : 'error', `Exiting with code ${code}`);
});

process.on('SIGINT', () => {
  logger.info('Shutting down manually');
});

async function start() {
  logger.info(`Starting server - mode ${env.node}`);
  await connectDb();
  await startHttpServer();
}

start()
  .then(() => {
    logger.info('Server ready');
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
