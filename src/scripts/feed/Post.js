import { getLoggedInUser, showAllUsers, getLikes } from "../data/DataManager.js";

//this needs to be located above the Post declaration
//this could also be imported to this module
const getNumberOfLikes = (postId) => {
  getLikes(postId)
  .then(response => {
    document.querySelector(`#likes__${postId}`).innerHTML = `👍 ${response.length}`;
  })
}

export const Posts = (postObject) => {
  let postAuthor = "";
  let editDelete = "";
// Checks if a post user ID matches current logged in user ID, 
// if true, displays edit/delete buttons
  if(postObject.userId === getLoggedInUser().id){
    editDelete = ` <button id="edit__${postObject.id}">Edit</button>
                    <button id="delete__${postObject.id}">Delete</button>`
    }
// Filters through users and determines if a user ID equals a user ID on a post
  showAllUsers().filter(singleUser => {
  if(singleUser.id === postObject.userId){
      postAuthor = `${singleUser.name}`
    };
  });
    return `
      <section class="post">
        <header>
          <h4>shared by ${postAuthor}</h4>
          <h2 class="post__title">${postObject.title} </h2>
        </header>
          <img class="post__image" src="${postObject.imageURL}" />
          <div>${postObject.description}</div>
          ${editDelete}
          <button id="like__${postObject.id}">👍</button>
          <p id="likes__${postObject.id}">${getNumberOfLikes(postObject.id)}</p>
      </section>
    `
};