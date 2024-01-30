 # API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 'api/products' [GET]
- Show 'api/products/:id' [GET]
- Create [token required] '/products' [POST]
- [OPTIONAL] Top 5 most popular products 'api/products/popular' [GET]
- [OPTIONAL] Products by category (args: product category) 'api/products/:category' [GET]

#### Users
- Index [token required] 'api/users' [GET]
- Show [token required] 'api/users/show/:id' [GET]
- Create N[token required] 'api/users/create' [POST]

#### Orders
- Current Order by user (args: user id)[token required] 'api/orders/:userId' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] 'api/orders/completed/:userId' [GET]

## Data Shapes
#### Product 
- id
- name
- price
- [OPTIONAL] category

Table: Products (id SERIAL PRIMARY KEY, name VARCHAR(50), price decimal)

#### User
- id
- firstName
- lastName
- password

Table: Users (id SERIAL PRIMARY KEY, firstName text, lastName text, password VARCHAR(50))

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

Table: Orders (id SERIAL PRIMARY KEY, user_id REFERENCES Users(id), status VARCHAR(8))


Table: products_order (id SERIAL PRIMARY KEY, product_id string REFERENCES product(id), order_id integer REFERENCES orders(id), quantity integer)