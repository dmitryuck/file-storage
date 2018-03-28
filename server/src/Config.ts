import { join, dirname } from 'path';
import nconf from 'nconf';

const Config = {
    PORT: 5000,
    MONGODB_URL: 'mongodb://localhost:27017/solidop',
    HOST_URL: 'http://localhost:3000'
}

export function initConfig() {
    nconf.use('memory');

    nconf.env();

    nconf.set('IS_PROD', process.env.PROD === 'true');
    nconf.set('PORT', process.env.PORT || Config.PORT);
    nconf.set('MONGODB_URL', process.env.MONGODB_URL || Config.MONGODB_URL);
    nconf.set('HOST_URL', process.env.HOST_URL || Config.HOST_URL);

    // nconf.defaults(Config);
}
