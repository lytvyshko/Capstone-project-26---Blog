import express from 'express';
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let posts = [];

const renderIndex = (req, res) => {
  const searchInput = req.query.q?.toLowerCase() || '';
  const { status } = req.query;

  const filteredBySearch = posts.filter(p => p.title.toLowerCase().includes(searchInput));

  const filteredByStatus = filteredBySearch.filter((post) => {
    if (status === 'completed') {
      return post.isComplete === true;
    } else if (status === 'incomplete') {
      return post.isComplete === false;
    }

    return post;
  })

  res.render("index.ejs", { posts: filteredByStatus, search: searchInput, status });
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

  res.redirect("/");
});

app.post('/edit/:id', (req, res) => {
  const id = Number(req.params.id);

  const editedTodo = posts.find(post => post.id === id);

  posts.splice(id - 1, 1, {
    ...editedTodo,
    id: id,
    title: req.body.noteHeader,
    text: req.body.noteDescription || '',
  });

  res.redirect('/');
});

app.patch("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));

  if (!post) {
    return res.status(404).send("Post not found");
  }

  post.isComplete = req.body.isComplete;

  res.sendStatus(204);
});

app.delete('/delete/:id', (req, res) => {
  const id = Number(req.params.id);
  posts = posts.filter(p => p.id !== id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});