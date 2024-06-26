// admin.js

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    const product = new Product(null, title, imageUrl, description, price);
    product.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit === 'true';
    const productId = req.params.productId;

    if (!editMode) {
        return res.redirect('/');
    }

    Product.findById(productId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
};

exports.postEditProduct = (req, res, next) => {
    const { productId, title, imageUrl, price, description } = req.body;
    const updatedProduct = new Product(productId, title, imageUrl, description, price);
    updatedProduct.save()
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId)
        .then(() => {
            console.log('Product deleted successfully!');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log('Error deleting product:', err);
            res.redirect('/admin/products');
        });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
};
