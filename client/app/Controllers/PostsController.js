import { ProxyState } from "../AppState.js";
import { postsService } from "../Services/PostsService.js";

function _draw() {
    let posts = ProxyState.posts
    let template = ''
    posts.forEach(p => template += p.Template)
    document.getElementById('post-body').innerHTML = template
}



export class PostsController {
    constructor() {
        console.log('post controllers');
        this.getPosts()
        ProxyState.on('posts', _draw)
    }

    getCurrentComments(postId) {

        console.log(postId, 'here is post id');
        ProxyState.currentComments = ProxyState.comments.filter(c => c.postId == postId.toString())
        console.log(ProxyState.comments);
        console.log(ProxyState.currentComments);
    }

    populateModal(id) {
        console.log(id);
        this.getCurrentComments(id)
        const post = ProxyState.posts.find(p => p.id == id)
        console.log('post', post)
        document.getElementById('comment-body-post').innerHTML = post.commentTemplate
    }

    async createPost() {
        window.event.preventDefault()
        let form = window.event.target
        let data = {
            id: "",
            imgUrl: form.url.value,
            title: form.title.value,
            originalDescription: form.description.value,
            editedDescription: form.description.value
        }
        form.reset()
        console.log(data);
        try {
            await postsService.createPost(data)

        } catch (error) {
            console.error(error);
        }
        await this.getPosts()
    }

    async getPosts() {
        try {
            await postsService.getPosts()
        } catch (error) {
            console.error(error)
        }
    }

    async deletePost(id) {
        try {
            await postsService.deletePost(id)
        } catch (error) {
            console.error(error)
        }
        this.getPosts()
    }

    async likePost(id) {
        await postsService.likePost(id, {})
        await this.getPosts()
    }
}