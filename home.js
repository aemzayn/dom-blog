window.onload = () => {
  const posts = getPosts();
  if (posts.length > 0) {
    const postContainer = document.getElementById("posts");
    posts.forEach((post) => {
      const card = document.createElement("div");
      card.className = "post";

      const titleEl = document.createElement("h2");
      titleEl.className = "title";
      titleEl.textContent = post?.title || "";

      const tagsEl = document.createElement("p");
      tagsEl.className = "tags";
      post.tags.forEach((tag) => {
        const tagEl = document.createElement("span");
        tagEl.className = "tag";
        tagEl.textContent = `#${tag}`;
        tagsEl.appendChild(tagEl);
      });

      const buttonEl = document.createElement("button");
      buttonEl.classList = "link";
      buttonEl.setAttribute("slug", post.slug);
      buttonEl.addEventListener("click", () => visitLink(post.slug));
      buttonEl.textContent = "continue reading ->";

      card.appendChild(titleEl);
      card.appendChild(tagsEl);
      card.appendChild(buttonEl);
      postContainer.appendChild(card);
    });
  }
};

var visitLink = function (slug) {
  window.location.assign("new.html?slug=" + slug);
};
