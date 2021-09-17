import { app } from "./app";
import config from "./config/config";
import logger from "./config/logger";
import { runRelationship } from "./models";

//Start app server
const start = async () => {
  const server = app.listen(config.PORT, () => {
    runRelationship();
    console.log(`Listening on port http://localhost:${config.PORT}!...`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info("Server closed");
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error: any) => {
    logger.error(error);
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    if (server) {
      server.close();
    }
  });
  //-->
  // const pusher = new Pusher({
  //   appId: "1267950",
  //   key: "a1ed4ddd22672692e182",
  //   secret: "099775aa395dd043d33d",
  //   cluster: "eu",
  //   useTLS: true,
  // });

  // pusher.trigger("my-channel", "my-event", {
  //   message: "hello world, This is from Nelson",
  // });
};

start();
