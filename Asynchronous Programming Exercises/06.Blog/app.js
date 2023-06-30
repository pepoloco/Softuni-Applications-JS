function attachEvents() {
  document.getElementById("btnLoadPosts").addEventListener("click", loadPost);
  document.getElementById("btnViewPost").addEventListener("click", viewPost);
}
async function loadPost(e) {
  try {
    const postUrl = "http://localhost:3030/jsonstore/blog/posts";

    const response = await fetch(postUrl);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();

    Object.entries(data).forEach(([key, value]) => {
      const optionElement = document.createElement("option");
      optionElement.value = key;
      optionElement.textContent = value.title;
      document.getElementById("posts").appendChild(optionElement);
    });
  } catch (err) {
    console.log(err);
  }
}

async function viewPost(e) {
  try {
    let postId = "";
    document.querySelectorAll("option").forEach((o) => {
      if (o.selected) {
        postId = o.value;
      }
    });
    const postUrl = `http://localhost:3030/jsonstore/blog/posts/${postId}`;
    const response = await fetch(postUrl);
    const data = await response.json();
    document.getElementById("post-title").textContent = data.title;
    document.getElementById("post-body").textContent = data.body;

    const commentsUrl = "http://localhost:3030/jsonstore/blog/comments";
    const commentsResponse = await fetch(commentsUrl);
    const commentsData = await commentsResponse.json();
    const filterComments = Object.values(commentsData).filter(
      (x) => x.postId === postId
    );
    filterComments.forEach((c) => {
      const liElement = document.createElement("li");
      liElement.textContent = c.text;
      document.getElementById("post-comments").appendChild(liElement);
    });
  } catch (e) {
    console.log(e);
  }
}

attachEvents();
