const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const defaultArray = [];

const blogSchema = {
  title: String,
  content: String,
};

const Blog = mongoose.model("blog", blogSchema);

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Blog.find({}, function (err, blog) {
    res.render("home", { newblog: blog });
  });
});

app.get("/posts/:postid", function (req, res) {
  // posts.forEach(function (newpost) {
  //   if (_.lowerCase(newpost.Title) === _.lowerCase(req.params.id)) {
  //     res.render("post", { newblogs: newpost });
  //   } else {
  //     console.log("Match not found");
  //   }
  // });
  const requestedId = req.params.postid;
  Blog.findOne({_id: requestedId},function(err, blog){
    res.render("post", {
      newblogs: blog
    });
});
});

app.get("/aboutus", function (req, res) {
  res.render("about", { content2: aboutContent });
});

app.get("/contactus", function (req, res) {
  res.render("contact", { content3: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  let blogTitle = req.body.heading;
  let blogContent = req.body.content;

  const newBlog = new Blog({
    title: blogTitle,
    content: blogContent,
  });
  newBlog.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.listen(3000, function(){
  console.log("Succeful");
});