import { OrderStore } from '../models/orders';

const store = new OrderStore();

describe('Order Model', () => {
  it('shoud have index method', () => {
    expect(store.index).toBeDefined();
  });

  it('Insert new order', async () => {
    const result = await store.create({
      id: 1,
      user_id: 1,
      status: 'complete',
    });
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: 'complete',
    });
  });

  it('Index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        status: 'complete',
      },
    ]);
  });

  it('Update inserted order', async () => {
    const result = await store.update({
      id: 1,
      user_id: 1,
      status: 'active',
    });
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: 'active',
    });
  });

  it('delete order', async () => {
    const result = await store.delete('1');
    expect(result).toBeUndefined();
  });
});
