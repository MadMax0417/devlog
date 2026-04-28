import app from "./app.js";
import dbConnect from "./lib/dbConnect.js";

const PORT = process.env.PORT || 4000;
console.log(PORT);

async function startServer() {
    try {
        await dbConnect(); 
        app.listen(PORT, () => {
            console.log(`App is live and listening to the port : ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();
