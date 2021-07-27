import express, {
  Application, 
  Request,
  Response,
  NextFunction,
  json,
} from 'express';
import path from 'path';
import { config } from 'dotenv';
// import https from 'https';
// import fs from 'fs';

import savedResultsRouter from './routes/savedResults';
import searchRouter from './routes/search';

config();

const PORT = process.env.APP_PORT;
const app: Application = express();

app.use(json());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../dist')));
}

app.use('/savedResults', savedResultsRouter);
app.use('/search', searchRouter);

app.use('*', (req: Request, res: Response) => (
  res.status(404).send('Cannot find ' + req.baseUrl)
));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { status, log, message } = err;
  console.log('Error: ' + (log || 'unknown error occurred.'));

  return res.status(status || 500).send(message || 'An error occurred.');
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});
