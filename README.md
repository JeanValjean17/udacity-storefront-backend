# Storefront Backend Project

## Getting Started

1. Run npm install to install all project dependencies
2. Setup a Postgres SQL instance. Create two databases, one for tests and one for development (name them as you wish).
3. Create an .env file in the root folder of the project
4. Write folloing environment variable names and its values POSTGRES_HOST (IP where the postgres instance is installed. Port used is the default 5432), POSTGRES_DB (database development name used in step 2), POSTGRES_TEST_DB (test database name used in step 2), POSTGRES_USER (user name string used for postgres instance), POSTGRES_PASSWORD (postgres user password), ENV (values should be either 'dev' or 'test'), TOKEN_SECRET (place here your password for jwt authentication), SALT_ROUNDS (number of salt rounds for bcrypt), BCRYPT_PASSWORD (bcrypt password). All these values are strings '' except for SALT_ROUNDS.
5. Run command db-migrate up to create tables required for project
6. Set ENV variable to 'test' and run npm run build to build project and run jasmine tests
7. Set ENV variable to 'dev' and run npm run start to start the backend. Application will run on port 3000
8. First create an user. As stated in REQUIREMENTS.md with the 'api/users/create' route. You will receive a token wich is necessary for the other routes (when specified) in the REQUIREMENTS.md
9. Save the token and for each request that needs it in for example postman, add it to the Authorization Tab and as type select "Bearer Token". Paste the token on the "Token" field.