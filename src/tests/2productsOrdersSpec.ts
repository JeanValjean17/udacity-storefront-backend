import { ProductsOrdersStore } from '../models/products_orders';

const store = new ProductsOrdersStore();

describe('Products Order Model', () => {
  it('shoud have index method', () => {
    expect(store.index).toBeDefined();
  });

  it('Insert new products order', async () => {
    const result = await store.create({
      id: 1,
      product_id: 1,
      order_id: 1,
      quantity: '1',
    });
    expect(result).toEqual({
      id: 1,
      product_id: 1,
      order_id: 1,
      quantity: '1',
    });
  });

  it('Index method should return a list of products orders', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        product_id: 1,
        order_id: 1,
        quantity: '1',
      },
    ]);
  });

  it('Update inserted product order', async () => {
    const result = await store.update({
      id: 1,
      product_id: 1,
      order_id: 1,
      quantity: '52',
    });
    expect(result).toEqual({
      id: 1,
      product_id: 1,
      order_id: 1,
      quantity: '52',
    });
  });

  it('delete products order', async () => {
    const result = await store.delete('1');
    expect(result).toBeUndefined();
  });
});
