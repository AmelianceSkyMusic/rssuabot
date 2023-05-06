// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';

const { GOOGLE_APPSSCRIPT_REST_API } = process.env;

export const baseURL = `https://script.google.com/macros/s/${GOOGLE_APPSSCRIPT_REST_API}/exec`;
