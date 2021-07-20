import 'reflect-metadata';
import { ConnectionOptions, getConnectionManager } from 'typeorm';
import { DBTypes } from '../constants.config';
import { env } from 'src/env';
import * as entities from '../../api/models';

import { getLogger } from '../logger.config';
const Logger = getLogger(__filename);

export async function connect() {
  try {
    logDbConfig();
    const connection = getConnectionManager().create(getOptions());
    await connection.connect();
  } catch (err) {
    Logger.error(err);
    process.exit(1);
  }
}

function getOptions(): ConnectionOptions {
  let options: ConnectionOptions = {
    host: env.db.host,
    type: DBTypes.mysql,
    database: env.db.database,
    entities: [...Object.values(entities)],
    synchronize: true,
    logging: 'all',
    migrations: env.app.dirs.migrations,
    // Logger: new CustomTypeOrmLogger(),
  };

  options = Object.assign(options, {
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
  });

  return options;
}

function logDbConfig(): void {
  Logger.info('Init database connection');
  Logger.info('Database type: ' + DBTypes.mysql);
  Logger.info('Database name: ' + env.db.database);
}
