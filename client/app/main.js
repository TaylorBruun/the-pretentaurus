import { AuthController } from './Controllers/AuthController.js'
import { CommentsController } from './Controllers/CommentsController.js';
import { PostsController } from './Controllers/PostsController.js';
import { ThesaurusController } from "./Controllers/ThesaurusController.js";
import { ValuesController } from './Controllers/ValuesController.js'

class App {
  authController = new AuthController();
  valuesController = new ValuesController();
  commentsController = new CommentsController()
  postsController = new PostsController()
  thesaurusController = new ThesaurusController()
}

// @ts-ignore
window.app = new App()
