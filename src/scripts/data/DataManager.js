export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
}

const loggedInUser = {
	id: 1,
	name: "Rick Sanchez",
	email: "rick@getschwifty.net"
}

export const getLoggedInUser = () => {
	return {...loggedInUser};
}

let postCollection = [];

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator (...) makes this quick work
  return [...postCollection];
}
export const getPosts = () => {
  return fetch("http://localhost:8088/posts")
    .then(response => response.json())
// takes the response and then inputs it into postCollection and returns the response
    .then(parsedResponse => {
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