// Gets registered users from JSON server
let allUsers = [];

export const showAllUsers = () => {
  return [...allUsers]
};

export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
    .then((response) => {
      allUsers = response
      return response
    })
};

getUsers()
  .then(() => {console.log("All the users now are belong to us", showAllUsers())})


// Sets default logged in user to an empty object.
// Then exports data using a spread function.
let loggedInUser = {}

export const getLoggedInUser = () => {
	return {...loggedInUser}
}

export const logoutUser = () => {
  loggedInUser = {}
}

// Sets logged in user to object passed through function
export const setLoggedInUser = (userObj) => {
  loggedInUser = userObj;
}

// In the DataManager we need to create a function that 
// requests the user information from the database. 
// One feature of json-server is the ability to filter the data. 
// Be sure to checkout the json-server documentation.

export const loginUser = (userObj) => {
  return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
  .then(response => response.json())
  .then(parsedUser => {
    //is there a user?
    console.log("parsedUser", parsedUser) //data is returned as an array
    if (parsedUser.length > 0){
      setLoggedInUser(parsedUser[0]);
      return getLoggedInUser();
    }else {
      //no user
      return false;
    }
  })
}

// In the DataManager we need to create a function that 
// POST a new user to the users table. This returns an 
// object with the user's information including the ID.

export const registerUser = (userObj) => {
  return fetch(`http://localhost:8088/users`, {
    method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userObj)
  })
  .then(response => response.json())
  .then(parsedUser => {
    setLoggedInUser(parsedUser);
    return getLoggedInUser();
  })
}


let postCollection = [];

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator (...) makes this quick work
  return [...postCollection];
}

// Now that we have multiple users, we want to know the author of a post. 
// Refactor the getPosts method and use the json-server feature to expand on the user.
export const getPosts = () => {
  const userId = getLoggedInUser().id
  return fetch(`http://localhost:8088/posts?_expand=user`)
    .then(response => response.json())
    .then(parsedResponse => {
      console.log("data with user", parsedResponse)
      postCollection = parsedResponse
      return parsedResponse.reverse();
    })
}
// function that writes to the JSON file ==========================
export const createPost = postObj => {
  return fetch("http://localhost:8088/posts", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)
  })
      .then(response => response.json())
}

//Fetch call that deletes a post ==================================
export const deletePost = postId => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
  })
      .then(response => response.json())
      .then(getPosts)
}

// Fetch call for post edit ==========================================

// First fetch call ensures we are working with the latest dataset
export const getSinglePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`)
    .then(response => response.json())
};

// Second fetch call fetches the data to edit it
export const updatePost = postObj => {
  return fetch(`http://localhost:8088/posts/${postObj.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)

  })
      .then(response => response.json())
      .then(getPosts)
}