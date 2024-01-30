import client from '../database';

export type Order = {
  id: number;
  user_id: number;
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async update(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE orders SET user_id = $1, status = $2 WHERE id=($3) RETURNING *';

      const result = await conn.query(sql, [o.user_id, o.status, o.id]);
      const prod = result.rows[0];
      conn.release();

      return prod;
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not update order ${o.id}. Error: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';

      const result = await conn.query(sql, [o.user_id, o.status]);
      const prod = result.rows[0];
      conn.release();

      return prod;
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not add order ${o.id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      const prod = result.rows[0];
      conn.release();

      return prod;
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
