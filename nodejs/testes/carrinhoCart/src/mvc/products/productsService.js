class ProductsService {
    constructor(db) {
        this.db = db 
    }

    async createProductsService(name, price, stock) {
        return await this.db.query(`
            INSERT INTO products (name, price, stock) VALUES ($1, $2, $3);`, 
            [name, price, stock]
        )
    }

    async deleteProductsService(id) {
        return await this.db.query(`
            delete from products where id = $1;`, 
            [id]
        )
    }

    async updateProductsService(name, price, stock, id) {
        return await this.db.query(`
            update products set 
                name = $1, price = $2, stock = $3 
                where id = $4`, 
            [name, price, stock, id]
        )
    }

    async listProductsService() {
        return await this.db.query(`
            select * from products;`
        )
    }
}

export default ProductsService