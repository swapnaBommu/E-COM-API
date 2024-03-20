//1. import express
import express from 'express';
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import bodyParser from 'body-parser';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwtAuth.middleware.js';
//2. create server
const server = express();

server.use(express.json());
server.use(bodyParser.json());

//3.Default request handler
server.get('/',(req, res) => {
    res.send('Welcome to Ecommerce APIs');
})
//For all req related to products redirect to product router
server.use('/api/products',jwtAuth, productRouter);
server.use('/api/users',userRouter);
//4. specify port
server.listen(5000);

console.log('server is running on port:5000');