import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentSchema } from '../models/Comment';
import { PostSchema } from '../models/Post';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);

  Account = mongoose.model('Account', AccountSchema);

  Profiles = mongoose.model('Profile', AccountSchema, 'accounts')

  Posts = mongoose.model('Post', PostSchema)

  Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
