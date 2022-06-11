export class Comment {
  constructor(data) {
    this.id = data.id
    this.name = data.creator.name
    this.creatorId = data.creatorId
    this.originalDescription = data.originalDescription
    this.editedDescription = data.editedDescription
    this.numberOfLikes = data.numberOfLikes
    this.likedBy = data.likedBy
    this.postId = data.postId
  }

  get Template() {
    return `
    <div class="d-flex justify-content-around">
 <div class="col-3 m-1">
        ${this.name}
      </div>
      <div class="col-9 m-1 d-flex justify-content-between">
        ${this.editedDescription}
        <span class="mdi mdi-arrow-up like-mdi " onclick="app.commentsController.likeComment('${this.id}')"><span>${this.numberOfLikes}</span></span>
        <button class="mdi mdi-delete" onclick="app.commentsController.deleteComment('${this.id}')"></button>
      </div>
      </div>
`
  }
}