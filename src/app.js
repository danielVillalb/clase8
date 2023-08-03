const express = require("express");
const productosRouter = require("./routes/productos");
const errorHandler = require("./middlewares/errorHandler");

const { auth } = require("express-oauth2-jwt-bearer");

require("dotenv").config();

const oauthCheck = auth({
  audience: process.env.OAUTH_AUDIENCE,
  issuerBaseURL: process.env.OAUTH_URL,
  tokenSigningAlg: "RS256",
});
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const app = express();
app.use(express.json())


// Ruta base
app.get("/", (req, res) => {
  res.send("API de productos");
});


// Ruta base
app.get("/health", (req, res) => {
  res.send("OK");
});


// Rutas de productos
app.use("/api/productos",oauthCheck, productosRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API de productos escuchando en el puerto ${PORT}`);
});

module.exports = app;
/*
aws ecr create-repository --repository-name api-productos --region us-east-1


aws cloudformation create-stack --template-body file://$PWD/infraestructure/vpc.yml --stack-name api-productos-docker-ecs-vpc

aws cloudformation create-stack --template-body file://$PWD/infraestructure/app-cluster.yml --stack-name api-productos-docker-ecs-cluster

aws cloudformation create-stack --template-body file://$PWD/infraestructure/api.yml --stack-name api-productos-docker-ecs-api

aws cloudformation delete-stack --stack-name api-productos-docker-ecs-vpc
aws cloudformation delete-stack --stack-name api-productos-docker-ecs-cluster
aws cloudformation delete-stack --stack-name api-productos-docker-ecs-api

aws cloudformation create-stack --template-body file://C:/Users/villa/Desktop/fullstackutn/clase8/ultimoIntento/api_productos_despliegue/infraestructure/vpc.yml --stack-name api-productos-docker-ecs-vpc

aws cloudformation create-stack --template-body file://C:/Users/villa/Desktop/fullstackutn/clase8/ultimoIntento/api_productos_despliegue/infraestructure/app-cluster.yml --stack-name api-productos-docker-ecs-cluster

aws cloudformation create-stack --template-body file://C:/Users/villa/Desktop/fullstackutn/clase8/ultimoIntento/api_productos_despliegue/infraestructure/api.yml --stack-name api-productos-docker-ecs-api



template-body
template-body
template-body




*/ 