import express from "express";
// import { pgPool } from "./src/config/pg.js";
// import axios from "axios";
import cors from "cors";
import routes from "./src/routes/index.js";
import UserRouter from "./src/routes/userRouter.js";

const app = express();
const port = 4040;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1", routes);
app.use("/v1", UserRouter);

// let data = JSON.stringify({
//   query: "{\n  auth_users {\n    name\n  }\n}\n",
//   variables: null,
// });

// app.get("/api", async (req, res) => {
//   const query = `{
//   auth_users {
//     name
//   }
// }`;

//   const { data } = await axios.post(
//     "https://tymnwgsergrzbmnjmbps.hasura.ap-south-1.nhost.run/v1/graphql",
//     {
//       query,
//     },

//     {
//       headers: {
//         "Content-Type": "application/json",
//         "x-hasura-admin-secret": "11Ah35@,C-i+w:gm2M=gm&AFKUXNfEK'",
//       },
//     }
//   );
//   res.send(data);
// });

// app.get("/", async (req, res) => {
//   const { rows } = await pgPool.query("SELECT * FROM public.auth_users");
//   res.send(rows);
// });

app.use(express.static("build"));

app.get("/testing", (req, res) => {
  res.send("Working chill Out!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
