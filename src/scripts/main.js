import { getPosts, getUsers } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./footer/footer.js"

const showNavBar = () => {
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
};

showNavBar();

const showFooter = () => {
    const footerElement = document.querySelector("footer");
    footerElement.innerHTML = Footer();
};

showFooter();

/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

// Get a reference to the location on the DOM where the app will display
// let postElement = document.querySelector(".postList");
// let navElement = document.querySelector("nav");
// let entryElement = document.querySelector(".entryForm")

const showPostList = () => {
    const postElement = document.querySelector(".postList");
      getPosts().then((allPosts) => {
          postElement.innerHTML = PostList(allPosts);
      })
  };

showPostList();

const startGiffyGram = () => {
    showPostList();

}
startGiffyGram();



getUsers()
.then(data => {
    console.log("User Data", data)
})

getPosts()
.then(data => {
    console.log("Post Data", data)
})