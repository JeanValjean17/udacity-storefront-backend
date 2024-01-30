import { UserStore } from '../models/users';
//import bcrypt from 'bcrypt';

const store = new UserStore();
//const PEPPER: string = process.env.BCRYPT_PASSWORD as string;
//const SALT_ROUNDS: string = process.env.SALT_ROUNDS as string;

describe('User Model', () => {
  it('shoud have index method', () => {
    expect(store.index).toBeDefined();
  });

  it('Insert new user', async () => {
    const result = await store.create({
      id: 1,
      firstname: 'Jean',
      lastname: 'Herrera',
      password: 'Test',
    });
    console.log(result);
    expect(result).toEqual({
      id: 1,
      firstname: 'Jean',
      lastname: 'Herrera',
      password: result.password,
    });
  });

  it('Index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        firstname: 'Jean',
        lastname: 'Herrera',
        password: result[0].password,
      },
    ]);
  });

  it('Update inserted user', async () => {
    const result = await store.update({
      id: 1,
      firstname: 'Carlos',
      lastname: 'Perez',
      password: 'Test',
    });

    expect(result).toEqual({
      id: 1,
      firstname: 'Carlos',
      lastname: 'Perez',
      password: result.password,
    });
  });

  it('delete user', async () => {
    const result = await store.delete('1');
    expect(result).toBeUndefined();
  });
});
