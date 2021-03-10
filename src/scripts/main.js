import { getPosts, getUsers, getLoggedInUser, usePostCollection } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./footer/footer.js";

// Query Selectors ==========================================
const showNavBar = () => {
	const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
};

const showFooter = () => {
	const footerElement = document.querySelector("footer");
	footerElement.innerHTML = Footer();
};



// Calling all imported functions===============================
const startGiffyGram = () => {
	showPostList();
	showFooter();
	showNavBar();
	getLoggedInUser();
	
	getUsers()
		.then((data) => {
		console.log("User Data", data);
});

	getPosts()
		.then((data) => {
		console.log("Post Data", data);
});

};

startGiffyGram();

// Event Listeners ==========================================

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", (event) => {
	if (event.target.id === "logout") {
		console.log("You clicked on logout");
	}
});

// applicationElement.addEventListener("change", (event) => {
// 	if (event.target.id === "yearSelection") {
// 		const yearAsNumber = parseInt(event.target.value);

// 		console.log(`User wants to see posts since ${yearAsNumber}`);
// 	}
// });

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

applicationElement.addEventListener("click", (event) => {
	if (event.target.id.startsWith("edit")){
		const splitID = event.target.id.split("--");
		console.log("you split the edit ID", splitID)
	}
})

// Filtered data =================================================
const showPostList = () => {
	const postElement = document.querySelector(".postList");
	getPosts()
	.then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	});
};


applicationElement.addEventListener("change", event => {
	if (event.target.id === "yearSelection") {
	const yearAsNumber = parseInt(event.target.value)
	console.log(`User wants to see posts since ${yearAsNumber}`)
	  //invoke a filter function passing the year as an argument
	showFilteredPosts(yearAsNumber);
	}
	})

	const showFilteredPosts = (year) => {
	//get a copy of the post collection
	const epoch = Date.parse(`01/01/${year}`);
	//filter the data
	const filteredData = usePostCollection().filter(singlePost => {
		if (singlePost.timestamp >= epoch) {
			return singlePost
	}
	})
	const postElement = document.querySelector(".postList");
		postElement.innerHTML = PostList(filteredData);
	}

