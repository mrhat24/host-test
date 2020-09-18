import express from 'express';
import {appRouter} from "./routes";
const app = express();
app.use(express.json());
appRouter(app);
export default app;
