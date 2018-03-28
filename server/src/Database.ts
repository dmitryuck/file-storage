import mongoose from 'mongoose';

export function dbConnect(mongoDbUrl: string): void {
    mongoose.connection.on('error', (err) => {
        console.log('DB connect error', err);
    });

    mongoose.connection.once('open', () => {
        console.log('DB connect good: ', mongoDbUrl);
    });

    mongoose.connection.once('close', () => {
        console.log('DB connect close');
    });

    mongoose.connect(mongoDbUrl);
}
