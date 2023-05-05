// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from 'dotenv';

const ENVIRONMENT = process.env;

dotenv.config();

export const ENV = process.env.MODE === 'dev' ? process.env : ENVIRONMENT;
