// const apiRouter = require('express').Router();
const express = require("express");
const apiRouter = express.Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const reviewsRouter = require("./reviews");
apiRouter.use("/reviews", reviewsRouter);

const tagsRouter = require("./tags");
apiRouter.use("/tags", tagsRouter);

const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);

//ROUTER: /api/cart
const cartRouter = require("./cart");
apiRouter.use("./cart", cartRouter);

module.exports = apiRouter;
