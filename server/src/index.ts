import express from 'express';
import bodyParser from 'body-parser';
import nconf from 'nconf';
import multer from 'multer';
import cors from 'cors';
import { initConfig } from './Config';
import { dbConnect } from './Database';
import { assignRoutes } from './Routes';
import { FileService } from './FileService';

initConfig();

const instance = express();

const corsOptions = {
    origin: nconf.get('HOST_URL'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
};
instance.use(cors(corsOptions));
instance.use(bodyParser.json({
    limit: '2mb'
}));
instance.use(bodyParser.urlencoded({
    limit: '2mb',
    extended: true,
    parameterLimit: 2000
}));
instance.use('/uploads', express.static('uploads'));

instance.set('nconf', nconf);

assignRoutes(instance);

setInterval(() => {
    FileService.checkFilesExpired();
}, 5000);

async function bootstrap() {
    await instance.listen(nconf.get('PORT'));

    dbConnect(nconf.get('MONGODB_URL'));

    console.log('Server running successfully');
}

bootstrap();
