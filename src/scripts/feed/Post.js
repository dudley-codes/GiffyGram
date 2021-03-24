import { getLoggedInUser, showAllUsers } from "../data/DataManager.js";

export const Posts = (postObject) => {
  let postAuthor = "";
  let editDelete = ""
  if(postObject.userId === getLoggedInUser().id){
    editDelete = ` <button id="edit__${postObject.id}">Edit</button>
                    <button id="delete__${postObject.id}">Delete</button>`
    }
    // Cycles through users and determines if a user ID equals a user ID on a post
  showAllUsers().filter(singleUser => {
  if(singleUser.id === postObject.userId){
      postAuthor = `post by ${singleUser.name}`
    }
  })
    return `
      <section class="post">
        <header>
          <h2 class="post__title">${postObject.title} ${postAuthor}</h2>
        </header>
          <img class="post__image" src="${postObject.imageURL}" />
          <div>${postObject.description}</div>
          ${editDelete}
      </section>
    `;
};

  

