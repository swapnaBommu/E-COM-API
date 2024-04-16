//1. import express
import express from 'express';
import cors from 'cors';
import swagger from 'swagger-ui-express';
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import cartRouter from './src/features/cartItems/cartItems.routes.js';
import bodyParser from 'body-parser';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwtAuth.middleware.js';
import apiDocs from './swagger.json' assert { type:'json'};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import {connectUsingMongoose} from './src/config/mongooseConfig.js';
//2. create server
const server = express();

server.use(express.json());
server.use(bodyParser.json());

//use logger middleware
server.use(loggerMiddleware);

//3.Default request handler
server.get('/',(req, res) => {
    res.send('Welcome to Ecommerce APIs');
})
// CORS policy configuration

var corsOptions = {
    origin: "http://localhost:5500"
  }
  server.use(cors(corsOptions));
  
  // server.use((req, res, next)=>{
  //   res.header('Access-Control-Allow-Origin','http://localhost:5500');
  //   res.header('Access-Control-Allow-Headers','*');
  //   res.header('Access-Control-Allow-Methods','*');
  //   // return ok for preflight request.
  //   if(req.method=="OPTIONS"){
  //     return res.sendStatus(200);
  //   }
  //   next();
  // })

//For all req related to products redirect to product router
server.use('/api-docs',swagger.serve,swagger.setup(apiDocs));
server.use('/api/products',jwtAuth, productRouter);
server.use('/api/users',userRouter);
server.use('/api/cartItems',jwtAuth,cartRouter);

//Error handle middleware
server.use((err, req, res, next) => {
    console.log(err);
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    //server error.
    res.status(500).send('Something went wrong, please try later');
});
//middleware to handle 404 responses
server.use((req,res)=>{
    res.status(404).send("API not found");
})
//4. specify port
server.listen(5000, () =>{
    console.log('server is running on port:5000');
    connectUsingMongoose();
});

