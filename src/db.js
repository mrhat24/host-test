import mongoose from 'mongoose';
import {environment} from "./env";

mongoose.connect(environment.mongoUrl(), {useUnifiedTopology: true});
export const db = mongoose.connection;
