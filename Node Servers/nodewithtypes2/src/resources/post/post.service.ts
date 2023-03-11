import postModel from "@/resources/post/post.model";
import Post from "@/resources/post/post.interface";

class PostService {
    private post = postModel;
    // Create a new post
    public async createPost(title: string, body: string): Promise<Post> {
        try {
            const post = await this.post.create({ title, body });
            return post;
        } catch (err: any) { throw new Error('Unable to create post') }
    }
}

export default PostService;