
const knex = require('knex')

class Products {

  constructor(tableName, dbConfig) {
    this.table = tableName,
      this.knex = knex(dbConfig)
  }

  async getAll() {
    try {
      const products = await this.knex.from(this.table).select('id', 'timestamp', 'title', 'category', 'description', 'stock', 'price', 'thumbnail')
      return products
    }
    catch (error) {
      console.log(error)
    }
    finally {
      /* this.knex.destroy() */
    }
  }

  async getById(id) {

    try {
      const product = await this.knex.from(this.table)
        .select('id', 'timestamp', 'title', 'category' , 'description', 'stock', 'price', 'thumbnail')
        .where({ id: id });
    } catch (error) {
      console.log(error)
    } finally {
      /* this.knex.destroy() */
    }

   
  }

  async save(newProductParam) {
    const { title, category, price, thumbnail, stock, description } = newProductParam;
    if (title != null && category != null && price != null && thumbnail != null && stock != null) {
      const newProduct = {
        timestamp: Date.now(),
        title,
        category,
        description,
        stock,
        price,
        thumbnail,
      };

      try {
        await this.knex(this.table).insert(newProduct)
      } catch (error) {
        console.log(error)
      } finally {
       /*  this.knex.destroy() */
      }

      return {
        message: "Created",
        product: newProduct,
      }
    } else {
      return {
        message: "Bad Request",
        error: "Incorrect format"
      }
    }

  }

  async updateById(id, product) {

    const { title, category, price, thumbnail, stock, description } = product;

    try {
      await this.knex.from(this.table)
        .where({ id: id })
        .update({
          title: title,
          category: category,
          price: price,
          thumbnail: thumbnail,
          stock: stock,
          description: description
        })
    } catch (error) {
      console.log(error)
    } finally {
     /*  this.knex.destroy() */
    }

    return { message: 'Updated successfully' }
  }

  async deleteById(id) {
    try {
      await this.knex.from(this.table)
        .where({ id })
        .del()
    } catch (error) {
      console.log(error)
    } finally {
/*       this.knex.destroy() */
    }
    return { message: 'Deleted successfully' }
  }
}

module.exports = Products