import cors from "cors";
import express from "express"; //para importar de esta forma tengo que ir al package.json y poner "type": "module", sino se importa con require
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

const app  = express();
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));  //credentials es para que podamos pasar las cookies al lado del client
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);



app.listen(8800, () => {
    console.log("Server ir running on port 8800!");
}); 