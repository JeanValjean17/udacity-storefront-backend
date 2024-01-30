import client from '../database';

export type Product = {
  id: number;
  name: string;
  price: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async update(p: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE products SET name = $1, price = $2 WHERE id=($3) RETURNING *';

      const result = await conn.query(sql, [p.name, p.price, p.id]);
      const prod = result.rows[0];
      conn.release();

      return prod;
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not update product ${p.name}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';

      const result = await conn.query(sql, [p.name, p.price]);
      const prod = result.rows[0];
      conn.release();

      return prod;
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not add product ${p.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM products WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      const prod = result.rows[0];
      conn.release();

      return prod;
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
