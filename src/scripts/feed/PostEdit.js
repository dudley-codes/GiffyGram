// Resets selected values to reflect those of post selected to edit
export const postEdit = (postObj) => {
    document.querySelector("input[name='postTitle']").value=postObj.title;
    document.querySelector("input[name='postURL']").value=postObj.imageURL;
    document.querySelector("textarea[name='postDescription']").value=postObj.description;
    document.querySelector("input[name='postId']").value=postObj.id;
    document.querySelector("input[name='postTime']").value=postObj.timestamp;
    document.querySelector("button[name='save']").id=`updatePost__${postObj.id}`;
    document.querySelector("button[name='save']").innerHTML="Update"
    document.getElementById("create__update").innerHTML="Edit This Post"
}