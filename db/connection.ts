import { Sequelize } from 'sequelize';

const db = new Sequelize('node_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false
});

export default db;