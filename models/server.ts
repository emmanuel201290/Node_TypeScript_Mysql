import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();

        this.middlewares();
        //Definiendo rutas
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database is online.');
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {
        //cors
        this.app.use(cors());

        //lectura del body, para ver los parametros que le enviamos en el post
        this.app.use(express.json());

        //carpetas publicas - servir contenido statico
        //sirvo el archivo html
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto !!' + this.port);
        })
    }
}

export default Server;