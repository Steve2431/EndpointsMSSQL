import express from 'express';
import productsRoutes from './routes/products.routes.js'
// const cors = require('cors');

// En caso de querer testear tus endpoints en otro archivo JS/JSX/TSX etc, siempre importa cors
// comando de instalacion - npm install cors
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use(productsRoutes)

export default app;