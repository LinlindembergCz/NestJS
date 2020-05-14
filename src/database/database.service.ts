import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '../config/config.module';
import {ConfigService} from '../config/config.service';
import {Configuration} from '../config/config.key';
import {ConnectionOptions} from 'typeorm';
import * as path from 'path';

export const databaseProviders=[
    TypeOrmModule.forRootAsync( {
        imports:[ConfigModule],
        inject:[ConfigService],
        async useFactory( config: ConfigService )
        {
            return {
                //ssl: true, //Habilitado para Cloud
                type: 'postgres' as 'postgres',
                host: config.get(Configuration.HOST),
                username: config.get(Configuration.USERNAME),
                password: config.get(Configuration.PASSWORD),
                database: config.get(Configuration.DATABASE),
                port: 5432,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/database/migrations/*{.ts,.js}'],

            } as ConnectionOptions
        },
    }) ,
];

/*
import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import AddressController from './address/address.controller';
import App from './app';
import AuthenticationController from './authentication/authentication.controller';
import CategoryController from './category/category.controller';
import * as config from './ormconfig';
import PostController from './post/post.controller';
import validateEnv from './utils/validateEnv';
 
validateEnv();
 
(async () => {
  try {
    const connection = await createConnection(config);
    await connection.runMigrations();
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app = new App(
    [
      new PostController(),
      new AuthenticationController(),
      new AddressController(),
      new CategoryController(),
    ],
  );
  app.listen();
})();
*/