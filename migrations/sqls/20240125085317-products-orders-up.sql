CREATE TABLE products_orders (id SERIAL PRIMARY KEY, product_id integer, order_id integer, quantity decimal, status VARCHAR(8))