export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
}

// export const getPosts = () => {

//     return fetch("http://localhost:8088/posts")
//     .then(response => response.json())

// }

const loggedInUser = {
	id: 1,
	name: "Rick Sanchez",
	email: "rick@getschwifty.net"
}

export const getLoggedInUser = () => {
	return loggedInUser;
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
      return parsedResponse;
    })
}