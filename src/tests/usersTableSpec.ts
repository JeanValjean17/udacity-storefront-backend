import { UserStore } from '../models/users';

const store = new UserStore();

describe('User Model', () => {
  it('shoud have index method', () => {
    expect(store.index).toBeDefined();
  });

  it('Insert new user', async () => {
    const result = await store.create({
      id: 1,
      firstname: 'Jean',
      lastname: 'Herrera',
      password: 'TestPassword',
    });
    expect(result).toEqual({
      id: 1,
      firstname: 'Jean',
      lastname: 'Herrera',
      password: 'TestPassword',
    });
  });

  it('Index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        firstname: 'Jean',
        lastname: 'Herrera',
        password: 'TestPassword',
      },
    ]);
  });

  it('Update inserted user',async () => {
    const result = await store.update({
      id: 1,
      firstname: 'Carlos',
      lastname: 'Perez',
      password: 'TestPassword',
    });
    expect(result).toEqual({
      id: 1,
      firstname: 'Carlos',
      lastname: 'Perez',
      password: 'TestPassword',
    });
  })  

  it('delete user', async () => {
    const result = await store.delete('1');
    expect(result).toBeUndefined();
  });
});
