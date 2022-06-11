import { AuthController } from './Controllers/AuthController.js'
import { CommentsController } from './Controllers/CommentsController.js';
import { PostController } from './Controllers/PostsController.js';
import { ValuesController } from './Controllers/ValuesController.js'

class App {
  authController = new AuthController();
  valuesController = new ValuesController();
  commentsController = new CommentsController()
  postsController = new PostController()
}

// @ts-ignore
window.app = new App()
