export const createPost = post => {

    return fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)

    })
        .then(response => response.json())
        .then(getPosts)
}