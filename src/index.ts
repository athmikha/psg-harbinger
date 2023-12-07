import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { acceptReportAndUpdateStatus } from '../routes/reportRoutes';

dotenv.config();

const app: Express = express();
const port = 8084
;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server gg');
});
app.post('/acceptReport/:reportId', acceptReportAndUpdateStatus);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});