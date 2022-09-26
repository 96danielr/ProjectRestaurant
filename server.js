const { app } = require('./app');
const { db } = require('./utils/db.utils');
const { initModels } = require('./models/initModels');
const dotenv = require('dotenv');

dotenv.config('env.');

const startServer = async () => {
    db.authenticate()
        .then(() => {
            console.log('database authenticate');
        })
        .catch((err) => console.log('error'));

    initModels();

    db.sync()
        .then(() => {
            console.log('database sync');
        })
        .catch((err) => console.log('error'));

    app.listen(9000, () => {
        console.log('Express app running!');
    });
};

startServer();
