export class Post {
  constructor(data) {
    this.name = data.creator.name
    this.title = data.title
    this.originalDescription = data.originalDescription
    this.editedDescription = data.editedDescription
    this.numberOfLikes = data.numberOfLikes
    this.likedBy = data.likedBy
    this.imgUrl = data.imgUrl
    this.id = data.id
  }


  get Template() {
    return `
        <div class="col-md-4">
<div class="post-card rounded p-2 shadow">
  <div class="d-flex justify-content-between text-break">
    <h4>${this.name}</h4>
    <span class="mdi mdi-arrow-up" onclick="app.postsController.likePost('${this.id}')"><span>${this.numberOfLikes}</span></span>
  </div>
  <img class="img-fluid p-4"
    src="${this.imgUrl}"
    alt="">
  <h4 class="text-center">${this.title}</h4>
  <p class="text-center">${this.editedDescription}</p>
  <div class="d-flex justify-content-between">
   <button type="button" onclick="app.postsController.populateModal('${this.id}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#post-comment-modal">
  See details
</button>
    <button class="btn btn-danger " onclick="app.postsController.deletePost('${this.id}')">Delete</button>
    </div>
</div>
</div>
`
  }

  get commentTemplate() {
    return `
 <div class="row">
      <div class="col-6">
        <h3>${this.title}</h3>
      </div>
      <div class="col-3">
        <p>${this.name}</p>
      </div>
      <div class="col-3">
        <p>${this.numberOfLikes}</p>
      </div>
      <div class="col-6">
        <img class="img-fluid" src="${this.imgUrl}" alt="">
      </div>
      <div class="col-6">
        <p>${this.originalDescription}</p>
      </div>
      <form class="form" onsubmit="app.commentsController.createComment('${this.id}')">
          <input name="originalDescription" id="originalDescription" autofocus required minlength="3" type="text"
            aria-label="Enter a comment" placeholder="Comment">
        </form>
    </div>
`
  }
}

