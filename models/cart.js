const fs = require('fs');
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);
module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }; // Initialize cart with correct structure
            if (!err) {
                try {
                    cart = JSON.parse(fileContent);
                } catch (error) {
                    console.error('Error parsing cart JSON:', error);
                }
            }
            //Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new Product/ increase Quantity 
            if(existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;

            } else {
                
                updatedProduct = { id: id, qty:1};
                cart.products = [...cart.products,updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err=>{
                console.log(err);
            });

        });

    } 


};