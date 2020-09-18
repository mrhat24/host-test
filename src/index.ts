import {evninronment} from "./env";
import app from "./app";

const PORT = evninronment.port;

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

