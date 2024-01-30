import { ProductStore } from '../models/product';

const store = new ProductStore();

describe('Product Model', () => {
  it('shoud have index method', () => {
    expect(store.index).toBeDefined();
  });

  it('Insert new product', async () => {
    const result = await store.create({
      id: 1,
      name: 'MyProduct',
      price: '2133',
    });
    expect(result).toEqual({
      id: 1,
      name: 'MyProduct',
      price: '2133',
    });
  });

  it('Index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'MyProduct',
        price: '2133',
      },
    ]);
  });

  it('Update inserted product',async () => {
    const result = await store.update({
      id: 1,
      name: 'MyProduct',
      price: '25',
    });
    expect(result).toEqual({
      id: 1,
      name: 'MyProduct',
      price: '25',
    });
  })  

  it('delete product', async () => {
    const result = await store.delete('1');
    expect(result).toBeUndefined();
  });
});
