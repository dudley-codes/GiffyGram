import { getPosts, getUsers } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./footer/footer.js";

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
	});
};

showPostList();

const startGiffyGram = () => {
	showPostList();
};
startGiffyGram();

getUsers().then((data) => {
	console.log("User Data", data);
});

getPosts().then((data) => {
	console.log("Post Data", data);
});

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", (event) => {
	if (event.target.id === "logout") {
		console.log("You clicked on logout");
	}
});

applicationElement.addEventListener("change", (event) => {
	if (event.target.id === "yearSelection") {
		const yearAsNumber = parseInt(event.target.value);

		console.log(`User wants to see posts since ${yearAsNumber}`);
	}
});

applicationElement.addEventListener("click", (event) => {
	if (event.target.id === "directMessageIcon") {
		console.log("You clicked IM");
	}
});

applicationElement.addEventListener("click", (event) => {
	if (event.target.id === "PB") {
		console.log("It's peanut butter jelly time!");
	}
});
