const form = document.getElementById("new-post-form");
const deleteButton = document.querySelector(`[data-button="delete"]`);
deleteButton?.addEventListener("click", () => deleteButtonHandler());
let editingSlug = null;

window.onload = () => {
  handleEditRoute();
};

function handleEditRoute() {
  const url = new URL(location.href);
  const params = new URLSearchParams(url.search);
  const slug = params.get("slug");
  if (slug) {
    const post = findPost(slug);
    if (post) {
      editingSlug = slug;
      populateFormWithPost(post);
      form[form.length - 2].textContent = "Update";
    }
  } else {
    deleteButton.style.display = "none";
  }
  handleFormEventListener();
}

function populateFormWithPost(post) {
  form[0].value = post.title;
  form[1].value = post.content;
  form[2].value = post.tags.join(", ");
  form[3].value = post.createdAt;
}

function handleFormEventListener() {
  form.addEventListener("submit", formSubmitHandler);
}

function deleteButtonHandler() {
  deletePost(editingSlug);
  location.assign("index.html");
}

function formSubmitHandler(event) {
  event.preventDefault();
  let title = event.target.title.value;
  let slug = title.replaceAll(" ", "-").toLowerCase();
  let content = event.target.content.value;
  let tags = event.target.tags.value.split(",").map((tag) => tag.trim());
  let createdAt = event.target.date.value;
  let updatedAt = createdAt;
  let id = Math.random().toString(36).substring(2, 9);
  let post = { id, title, slug, content, tags, createdAt, updatedAt };
  if (editingSlug) {
    updatePost(editingSlug, post);
  } else {
    addPost(post);
  }
  form.reset();
  editingSlug = null;
  location.assign("index.html");
}

var getPosts = function () {
  const storedPost = localStorage.getItem("posts");
  return storedPost ? JSON.parse(storedPost) : [];
};

var storePost = function (posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
};

var addPost = function (post) {
  const posts = getPosts();
  posts.push(post);
  storePost(posts);
};

var deletePost = function (slug) {
  const posts = getPosts();
  const filteredPosts = posts.filter((post) => post.slug !== slug);
  storePost(filteredPosts);
};

var updatePost = function (slug, post) {
  const posts = getPosts();
  const updatedPosts = posts.map((p) => {
    if (p.slug !== slug) return p;
    const updatedAt = new Date().toISOString();
    return {
      ...p,
      ...post,
      updatedAt,
    };
  });
  storePost(updatedPosts);
};

var findPost = function (slug) {
  const posts = getPosts();
  return posts.find((p) => p.slug === slug);
};
