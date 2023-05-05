import { ENV_DEV } from './ENV_DEV';

export const ENV = ENV_DEV.MODE === 'dev' ? ENV_DEV : process.env;
