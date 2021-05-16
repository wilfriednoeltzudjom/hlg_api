const express = require('express');

const { productController } = require('../../../../controllers');
const HttpRequest = require('../../../../application/payloads/http-request');

const router = express.Router();

router.post('/', (req, res, next) => {
  productController
    .createProduct(HttpRequest.fromExpress(req))
    .then((httResponse) => res.status(httResponse.status).json(httResponse.toJSON()))
    .catch((error) => next(error));
});

router.get('/', (req, res, next) => {
  productController
    .getProducts(HttpRequest.fromExpress(req))
    .then((httResponse) => res.status(httResponse.status).json(httResponse.toJSON()))
    .catch((error) => next(error));
});

router.put('/:productId', (req, res, next) => {
  productController
    .updateProduct(HttpRequest.fromExpress(req))
    .then((httResponse) => res.status(httResponse.status).json(httResponse.toJSON()))
    .catch((error) => next(error));
});

router.delete('/:productId', (req, res, next) => {
  productController
    .deleteProduct(HttpRequest.fromExpress(req))
    .then((httResponse) => res.status(httResponse.status).json(httResponse.toJSON()))
    .catch((error) => next(error));
});

router.post('/search', (req, res, next) => {
  productController
    .searchProducts(HttpRequest.fromExpress(req))
    .then((httResponse) => res.status(httResponse.status).json(httResponse.toJSON()))
    .catch((error) => next(error));
});

router.get('/analytics', (req, res, next) => {
  productController
    .getProductsAnalytics(HttpRequest.fromExpress(req))
    .then((httResponse) => res.status(httResponse.status).json(httResponse.toJSON()))
    .catch((error) => next(error));
});

module.exports = router;
