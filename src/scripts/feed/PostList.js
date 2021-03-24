import { getPosts } from "../data/DataManager.js";
import { Posts } from "./Post.js";

export const PostList = (allPosts) => {
	let postHTML = "";
		//Loop over the array of posts and for each one, invoke the Post component which returns HTML representation
		for (const postObject of allPosts) {
			//what is a postObject?
			postHTML += Posts(postObject)
		}
		return postHTML;
	
}

export const showPostList = () => {
	const postElement = document.querySelector(".postList");
	getPosts()
	.then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	});
};

export const showPostsByUser = () => {
	const postElement = document.querySelector(".postList");
	getPosts()
}