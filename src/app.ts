import express from 'express';
import 'express-async-errors';
import {appRouter} from "./router";
const app = express();
app.use(express.json());
appRouter(app);
export default app;
