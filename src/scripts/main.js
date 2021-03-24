import { getPosts, getUsers, getLoggedInUser, deletePost, createPost, 
        getSinglePost, updatePost, logoutUser, loginUser, setLoggedInUser } from "./data/DataManager.js";
import { showPostList } from "./feed/PostList.js";
import { showNavBar } from "./nav/NavBar.js";
import { showFooter, showFilteredPosts } from "./footer/footer.js";
import { PostEntry, resetForm } from "./feed/PostEntry.js"
import { postEdit } from "./feed/PostEdit.js"
import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";

const applicationElement = document.querySelector(".giffygram");

// Logout event Listener ==========================================
applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		logoutUser();
		console.log(getLoggedInUser());
		sessionStorage.clear();
		checkForUser();
	}
})

// Login form event listener
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
	  //collect all the details into an object
	const userObject = {
		name: document.querySelector("input[name='name']").value,
		email: document.querySelector("input[name='email']").value
	}
	loginUser(userObject)
	.then(dbUserObj => {
		if(dbUserObj){
		sessionStorage.setItem("user", JSON.stringify(dbUserObj));
		startGiffyGram();
		}else {
		  //got a false value - no user
		const entryElement = document.querySelector(".entryForm");
		entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
		}
		})
	}
})

// If no logged in user, displays registration form
const showLoginRegister = () => {
	showNavBar();
	const entryElement = document.querySelector(".entryForm");
	//template strings can be used here too
	entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
	//make sure the post list is cleared out too
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = "";
}



// Register event listener

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "register__submit") {
	  //collect all the details into an object
		const userObject = {
		name: document.querySelector("input[name='registerName']").value,
		email: document.querySelector("input[name='registerEmail']").value
	}
	registerUser(userObject)
	.then(dbUserObj => {
		sessionStorage.setItem("user", JSON.stringify(dbUserObj));
		startGiffyGram();
	})
	}
})

//Form reset if you hit cancel
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newPost__cancel") {
		clickEvent.preventDefault(); // prevents the page from refreshing
        resetForm(); // resets the form
		showPostEntry();
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
        const postObject = {
            title: title,
            imageURL: url,
            description: description,
			userId: getLoggedInUser().id,
            timestamp: Date.now()
        };
// pulls new post and resets the form without refreshing the page
        createPost(postObject)
		.then(() => {
			showPostList();
			resetForm();
		})
		
    }
})

const showPostEntry = () => { 
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
	}

// Currently unused event listeners -- IM, Logout===================================

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

// Delete post event listener =====================================

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("delete")) {
		const postId = event.target.id.split("__")[1];
		console.log(postId)
		deletePost(postId)
		.then(showPostList)
	}
})

// Edit button event listener
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("edit")) {
		const postId = event.target.id.split("__")[1];
		getSinglePost(postId)
		.then(response => {
			postEdit(response);
		})
	}
})

// Post edited post event listener

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("updatePost")) {
		const postId = event.target.id.split("__")[1];
		//collect all the details into an object
		const title = document.querySelector("input[name='postTitle']").value
		const url = document.querySelector("input[name='postURL']").value
		const description = document.querySelector("textarea[name='postDescription']").value
		const timestamp = document.querySelector("input[name='postTime']").value
		
		const postObject = {
			title: title,
			imageURL: url,
			description: description,
			userId: getLoggedInUser().id,
			timestamp: parseInt(timestamp),
			id: parseInt(postId)
		}
			showPostEntry()
			updatePost(postObject)

		.then(() => {
			showPostList();
			resetForm()
		})
	}
})

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

// Checks for logged in user
const checkForUser = () => {
	if (sessionStorage.getItem("user")){
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
	startGiffyGram();
	} else {
		showLoginRegister();
	}
}

checkForUser();
