const conn = require('../db/conn');

const { ObjectId } = require('mongodb');

class Product {

    constructor(name, image, price, description) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
    }

    save() {
        const product = conn.db().collection('products').insertOne({
            name: this.name,
            image: this.image,
            price: this.price,
            description: this.description
        });

        return product;
    }

    static async getProducts() {
        const product = await conn.db().collection('products').find().toArray();

        console.log(product._id);

        return product;
    }

    static async getProductById(id) {

        if (typeof id !== 'string' || id.length !== 24) {
            throw new Error('Invalid ID');
        }

        const product = await conn.db().collection('products').findOne({ _id: new ObjectId(id) });

        console.log(product._id);

        return product;
    }

    static async removeProductById(id) {
        await conn.db().collection('products').deleteOne({ _id: new ObjectId(id) });

        return;

    }

    updateProduct(id) {

        conn.db().collection('products').updateOne({ _id: new ObjectId(id) }, { $set: this });

        return;

    }
}

module.exports = Product;