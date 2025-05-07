import createDebug from "debug";
import app from "./app.js";
import chalk from "chalk";

const debug = createDebug("vinyls:server");

const startServer = (port: number): void => {
  app.listen(port, () => {
    debug(
      chalk.bold.green(" *** Server listening on: => ") +
        chalk.bold.underline.white(port),
    );
  });
};

export default startServer;
