import express from 'express';
import routes from './routes/routes';

export const app = express();
const port = 3000;

app.use('/api', routes);

app.listen(port, () => {
  console.log('server started ' + 'localhost:' + port);
});

export default app;
