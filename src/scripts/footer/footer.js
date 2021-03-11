import { usePostCollection } from "/scripts/data/DataManager.js"
import { PostList } from "/scripts/feed/PostList.js"

export const Footer = () => {

    // HTML to be returned to GiffyGram component
    return `
        <footer class="footer">
            <div class="footer__item">
                Posts since <select id="yearSelection">
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                </select>
                <span id="postCount" value=""></span>
            </div>
        </footer>
    `
}

document.addEventListener("change", event => {
	if (event.target.id === "yearSelection") {
	const yearAsNumber = parseInt(event.target.value)
	console.log(`User wants to see posts since ${yearAsNumber}`)
	  //invoke a filter function passing the year as an argument
	showFilteredPosts(yearAsNumber);
	}
	})

export  const showFilteredPosts = (year) => {
        //get a copy of the post collection
        const epoch = Date.parse(`01/01/${year}`);
        //filter the data
        const filteredData = usePostCollection().filter(singlePost => {
            if (singlePost.timestamp >= epoch) {
                return singlePost
        }
        })
    
        console.log("Filtered Data length", filteredData.length)

        const postElement = document.querySelector(".postList");
            postElement.innerHTML = PostList(filteredData);

        const postCount = document.querySelector("#postCount");
        if(filteredData.length === 0 ) {
            postCount.innerHTML = ""
        } else if (filteredData.length > 0) {
            postCount.innerHTML = filteredData.length;}
}