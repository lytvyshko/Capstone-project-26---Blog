import express from 'express';
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const posts = [];

const renderIndex = (req, res) => {
  const { status } = req.query;
  console.log(status);

  res.render("index.ejs");
};

app.get("/", renderIndex);
app.get("/posts", renderIndex);

app.post("/submit", (req, res) => {
  if (req.body.noteHeader) {
    posts.push({
      id: posts.length + 1,
      title: req.body.noteHeader,
      text: req.body.noteDescription || '',
      isComplete: false,
    });
  }

  res.render("index.ejs", { posts });
});

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});