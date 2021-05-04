const express = require('express');

const { categoryController } = require('../../../../controllers');
const HttpRequest = require('../../../../application/payloads/http-request');

const router = express.Router();

router.post('/', (req, res, next) => {
  categoryController
    .createCategory(HttpRequest.fromExpress(req))
    .then((httResponse) => res.status(httResponse.status).json(httResponse.toJSON()))
    .catch((error) => next(error));
});

router.get('/', (req, res, next) => {
  categoryController
    .getCategories(HttpRequest.fromExpress(req))
    .then((httResponse) => res.status(httResponse.status).json(httResponse.toJSON()))
    .catch((error) => next(error));
});

router.put('/:categoryId', (req, res, next) => {
  categoryController
    .updateCategory(HttpRequest.fromExpress(req))
    .then((httResponse) => res.status(httResponse.status).json(httResponse.toJSON()))
    .catch((error) => next(error));
});

router.delete('/:categoryId', (req, res, next) => {
  categoryController
    .deleteCategory(HttpRequest.fromExpress(req))
    .then((httResponse) => res.status(httResponse.status).json(httResponse.toJSON()))
    .catch((error) => next(error));
});

module.exports = router;
