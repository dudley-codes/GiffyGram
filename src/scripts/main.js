import { getPosts, getUsers, getLoggedInUser, usePostCollection, createPost } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer, showFilteredPosts } from "./footer/footer.js";
import { PostEntry, resetForm } from "./feed/PostEntry.js"



// Query Selectors ==========================================
const showNavBar = () => {
	const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
};

const showFooter = () => {
	const footerElement = document.querySelector("footer");
	footerElement.innerHTML = Footer();
};

const showPostList = () => {
	const postElement = document.querySelector(".postList");
	getPosts()
	.then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	});
};


// console.log("PostList length", showPostList().length())
// const showPostEntry = () => {
// 	const footerElement = document.querySelector(".entryForm");
// 	footerElement.innerHTML = PostEntry();
// };






// Event Listeners ==========================================

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", (event) => {
	if (event.target.id === "logout") {
		console.log("You clicked on logout");
	}
});

// Create new post event listeners==================================

//Form reset if you hit cancel
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newPost__cancel") {
		clickEvent.preventDefault(); // prevents the page from refreshing
        resetForm(); // resets the form
    }
})

// click event that calls createPost function from DataManager to write to JSON file.
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newPost__submit") {
		//colllect the input values into an object to post to the DB
		clickEvent.preventDefault();
        const title = document.querySelector("input[name='postTitle']").value;
        const url = document.querySelector("input[name='postURL']").value;
        const description = document.querySelector("textarea[name='postDescription']").value;
		//we have not created a user yet - so we will hard code `1` for now.
        const postObject = {
            title: title,
            imageURL: url,
            description: description,
			userId: 1,
            timestamp: Date.now()
        };
// pulls new post and resets the form without refreshing the page
        createPost(postObject)
		.then(response =>
			showPostList())
		.then(response =>
			resetForm())
    }
})

const showPostEntry = () => { 
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
	}

// Create new post event listeners===================================



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






// Calling all imported functions===============================

const startGiffyGram = () => {
	showPostList();
	showFooter();
	showNavBar();
	showPostEntry();
	getLoggedInUser();
	showFilteredPosts();
	
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
