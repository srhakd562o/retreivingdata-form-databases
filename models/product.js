const db = require('../util/database');

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        return db.execute(
            'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.imageUrl, this.description]
        );
    }

    static findById(id) {
        return db.execute('SELECT * FROM products WHERE id = ?', [id])
            .then(([rows, fields]) => {
                return rows.length > 0 ? rows[0] : null;
            })
            .catch(err => {
                throw err;
            });
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products')
            .then(([rows, fields]) => {
                return rows;
            })
            .catch(err => {
                throw err;
            });
    }

    static deleteById(id) {
        return db.execute('DELETE FROM products WHERE id = ?', [id]);
    }
};
