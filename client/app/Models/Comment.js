export class Comment {
  constructor(data) {
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
 <div class="col-3">
        ${this.name}
      </div>
      <div class="col-9">
        ${this.originalDescription}
      </div>
`
  }
}