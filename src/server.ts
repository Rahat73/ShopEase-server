import { Server } from "http";
import app from "./app";
import seedAdmin from "./app/db";

const port = 5000;

async function main() {
  try {
    seedAdmin();
    const server: Server = app.listen(port, () => {
      console.log("SHOPEASE sever is running on port ", port);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
