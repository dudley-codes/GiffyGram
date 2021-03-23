export const PostEntry = () => {
    return `
    <form class="newPost">
    <h3 id="create__update">Create a New Post</h3>
        <div>
            <input value=""
                    name="postTitle"
                    class="newPost__input"
                    type="text"
                    placeholder="Title" />
        </div>
        <div>
            <input value=""
                    name="postURL"
                    class="newPost__input"
                    type="text"
                    placeholder="URL of gif" />
        </div>

        <textarea name="postDescription"
            class="newPost__input newPost__description"
            placeholder="Story behind your gif..."></textarea>
        
        <input type="hidden" value="" name="postId">
        <input type="hidden" value="" name="postTime">	
        <button id="newPost__submit" name="save">Save</button>
        <button id="newPost__cancel" name="cancel">Cancel</button>
    </form>
    `
};

// resets the form text without refreshing the page
export const resetForm = () => {
    document.querySelector("input[name='postTitle']").value="";
    document.querySelector("input[name='postURL']").value="";
    document.querySelector("textarea[name='postDescription']").value="";
};