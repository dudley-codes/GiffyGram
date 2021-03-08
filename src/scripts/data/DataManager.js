export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
}

export const getPosts = () => {

    return fetch("http://localhost:8088/posts")
    .then(response => response.json())

}

const loggedInUser = {
	id: 1,
	name: "Rick Sanchez",
	email: "rick@getschwifty.net"
}

export const getLoggedInUser = () => {
	return loggedInUser;
}