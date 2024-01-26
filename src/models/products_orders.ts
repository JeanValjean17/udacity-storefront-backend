import client from '../database';

export type ProductsOrders = {
  id: number;
  product_id: number;
  order_id: number;
  quantity: string;
};

export class ProductsOrdersStore {
  async index(): Promise<ProductsOrders[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products_orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not get products_orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<ProductsOrders> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products_orders WHERE id=($1)';

      const result = await conn.query(sql);
      conn.release();

      return result.rows[0];
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not find products_orders ${id}. Error: ${err}`);
    }
  }

  async create(o: ProductsOrders): Promise<ProductsOrders> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products_orders (product_id, order_id, quantity) VALUES($1, $2, $3) RETURNING *';

      const result = await conn.query(sql, [
        o.product_id,
        o.order_id,
        o.quantity,
      ]);
      const prod = result.rows[0];
      conn.release();

      return prod;
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not add products_orders ${o.id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<ProductsOrders> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM products_orders WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      const prod = result.rows[0];
      conn.release();

      return prod;
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not delete products_orders ${id}. Error: ${err}`);
    }
  }
}
