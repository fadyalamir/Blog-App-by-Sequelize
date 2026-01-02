import { checkDBConnection, syncDBConnection } from './DB/connection.js';
import authController from './modules/auth/auth.controller.js';
import userController from './modules/user/user.controller.js';
import blogController from './modules/blog/blog.controller.js';

const bootstrap = (app, express) => {
  app.use(express.json()); // convert buffer data

  // Application Routing
  app.get('/', (req, res) => res.send('Hello World!'));

  // Sub-Routing
  app.use("/auth", authController)
  app.use("/user", userController)
  app.use("/blog", blogController)
  app.all("*", (req, res, next) => {
    return res.status(404).json({ message: "Page not found" })
  });

  // DB
  checkDBConnection();
  syncDBConnection();
}

export default bootstrap