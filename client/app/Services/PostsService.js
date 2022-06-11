import { ProxyState } from "../AppState.js";
import { Post } from "../Models/Post.js";
import { api } from "./AxiosService.js";

class PostsService {

    async getPosts() {
        const res = await api.get('api/posts')
        console.log(res.data);
        ProxyState.posts = res.data.map(p => new Post(p))
    }
    async createPost(data) {
        const res = await api.post('api/posts', data)
        console.log(res.data);
    }

    async deletePost(id) {
        const res = await api.delete('api/posts/' + id)
        console.log(res.data);
    }

    async likePost(id) {
        const res = await api.put('api/posts/' + id + '/likes')
        console.log(res.data);
    }
}



export const postsService = new PostsService()