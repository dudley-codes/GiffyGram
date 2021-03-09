export const PostEntry = () => {
    return `
    <div class="newPost">
        <div>
            <input value="Learning JavaScript"
                   name="postTitle"
                   class="newPost__input"
                   type="text"
                   placeholder="Title" />
        </div>
        <div>
            <input value="https://media.giphy.com/media/S9dN7OWFj8GoRhTIuL/giphy-downsized.gif"
                   name="postURL"
                   class="newPost__input"
                   type="text"
                   placeholder="URL of gif" />
        </div>

        <textarea name="postDescription"
            class="newPost__input newPost__description"
            placeholder="Story behind your gif...">Ethical chillwave jianbing ramps plaid subway tile.</textarea>

        <button id="newPost__submit">Save</button>
        <button id="newPost__cancel">Cancel</button>
    </div>
    `
}

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newPost__cancel") {
        //clear the input fields
    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newPost__submit") {
		//colllect the input values into an object to post to the DB

        const title = document.querySelector("input[name='postTitle']").value
        const url = document.querySelector("input[name='postURL']").value
        const description = document.querySelector("textarea[name='postDescription']").value
		//we have not created a user yet - so we will hard code `1` for now.
        const postObject = {
            title: title,
            imageURL: url,
            description: description,
			userId: 1,
            timestamp: Date.now()
        }

		// be sure to import from the store
        createPost(postObject)
    }
})
