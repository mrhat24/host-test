import express from 'express';
import {appRouter} from "./router";
import {db} from "./db";
const app = express();
app.use(express.json());
appRouter(app);
export default app;
