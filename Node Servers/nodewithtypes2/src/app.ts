import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import errorMiddleware from '@/middlewares/error.middleware';
import helmet from 'helmet';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;
        this.initialiseDBConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        })
    }

    private initialiseErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

    private initialiseDBConnection(): void {
        mongoose.connect(String(process.env.DATABASE_URI));
    }

    public listen(): void {
        mongoose.connection.once('open', () => {
            console.log(`Database connected`);
            this.express.listen(this.port, () => { console.log(`App listening on the port ${this.port}`); });
        })
    }
}

export default App;