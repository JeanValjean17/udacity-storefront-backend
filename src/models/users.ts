import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const PEPPER: string = process.env.BCRYPT_PASSWORD as string;
const SALT_ROUNDS: string = process.env.SALT_ROUNDS as string;

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async update(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE users SET firstName = $1, lastName = $2, password = $3 WHERE id=($4) RETURNING *';

      const hash = bcrypt.hashSync(u.password + PEPPER, parseInt(SALT_ROUNDS));
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        hash,
        u.id,
      ]);
      const prod = result.rows[0];
      conn.release();

      return prod;
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not update user ${u.id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *';

      const hash = bcrypt.hashSync(u.password + PEPPER, parseInt(SALT_ROUNDS));
      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      const prod = result.rows[0];
      conn.release();

      return prod;
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not add user ${u.id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      const prod = result.rows[0];
      conn.release();

      return prod;
    } catch (err: NodeJS.ErrnoException | unknown) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
