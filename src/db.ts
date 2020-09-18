import mongoose from 'mongoose';
import {evninronment} from "./env";

mongoose.connect(evninronment.mongoUrl, {useNewUrlParser: true});
export const db = mongoose.connection;
