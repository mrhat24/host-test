import {environment} from "./env";
import app from "./app";
import {db} from "./db";

const PORT = environment.port;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
});

