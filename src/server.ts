import { app } from "./app";
import { config } from "./config";
import dbinit from "./db";

const main = () => {
  dbinit()

  app.listen(config.port, () => {
    console.log(`Express Book server is listening on port ${config.port}`);
  });
};

main()