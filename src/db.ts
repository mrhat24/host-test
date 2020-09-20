import mongoose from 'mongoose';
import {evninronment} from "./env";

mongoose.connect(evninronment.mongoUrl, {useUnifiedTopology: true});
export const db = mongoose.connection;
