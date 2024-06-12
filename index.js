import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

let posts = [];
let flag = true;
let postId = "";

app.get("/", (req, res) => {
  flag = true;
  res.render("index", { posts: posts });
});

app.get("/new-post", (req, res) => {
  res.render("new-post");
});

app.post("/new-post", (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/edit-post", (req, res) => {
  flag = false;
  res.render("edit-post", { posts: posts });
});

app.get("/post/:id", (req, res) => {
  if (flag) {
    const postId = req.params.id;
    const post = posts[postId];
    res.render("post", { post: post });
  } else {
    postId = req.params.id;
    const post = posts[postId];
    res.render("post-edit", { post: post });
  }
});

app.post("/post-edit", (req, res) => {
  posts[postId] = {
    title: req.body.title,
    content: req.body.content,
  };
  flag = true;
  res.redirect("/");
});

app.delete("/post/:id", (req, res) => {
  const postId = req.params.id;
  posts.splice(postId, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
