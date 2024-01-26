import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

describe("Product Model", () => {
    it('shoud have index method', () => {
        expect(store.index).toBeDefined();
    });
    
    it('Insert new product', async () => {
        const result = await store.create({
            id: 1,
            name: 'MyProduct',
            price: '2133'
        });
        console.log(result);
        expect(result).toEqual({
            id: 1,
            name: 'MyProduct',
            price: '2133'
        });
    });

    it('Index method should return a list of products', async () => {
        const result = await store.index();
        console.log(result);
        expect(result).toBeDefined();
    });

    
});