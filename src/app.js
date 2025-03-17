import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import ProductManager from './managers/product.manager.js';
import DataBase from './database.js';
import initializePassport from "./config/passport.config.js"
import passport from 'passport';
import cookieParser from 'cookie-parser';

const app = express();
const PUERTO = 8080;
const productManager = new ProductManager();
const instanceDB = DataBase.getInstance();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

// Middleware incorporado (archivos estáticos)
app.use(express.static("./src/public"));

// Express-Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Rutas

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);


// La app escuchando en el puerto 8080 (el que se le indica)

const httpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
})

// Websockets
const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("Cliente conectado");
    
    socket.emit("products", await productManager.getProducts());

    socket.on("addNewProduct", async () => {
        io.sockets.emit("products", await productManager.getProducts());
    });

    socket.on("deleteProd", async () => {
        socket.emit("products", await productManager.getProducts());
    });
});