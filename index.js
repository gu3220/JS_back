const express = require('express');
const http = require('http');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
console.log('URL = ', req.url);
console.log('Original_URL = ', req.origialUrl);
console.log('METHOD = ', req.method);
console.log('HOST = ', req.headers.host);
console.log('InSecure = ', req.secure); 
console.log('BODY', req.body);
console.log('QUERY', req.query);

next();
});

const createPost = async (req, res) => {
    try {
      const post = await db.ToDo.create(req.body);
      return res.status(201).json({
        post,
      });
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }

  const getAllPosts = async (req, res) => {
    try {
      const posts = await db.ToDo.findAll();
      return res.status(200).json({ posts });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  const getPostById = async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await db.ToDo.findOne({
        where: { id: postId }
      });
      if (post) {
        return res.status(200).json({ post });
      }
      return res.status(404).send('Post with the specified ID does not exists');
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  const updatePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const [ updated ] = await db.ToDo.update(req.body, {
        where: { id: postId }
      });
      if (updated) {
        const updatedPost = await db.ToDo.findOne({ where: { id: postId } });
        return res.status(200).json({ post: updatedPost });
      }
      throw new Error('Post not found');
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  const deletePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const deleted = await db.ToDo.destroy({
        where: { id: postId }
      });
      if (deleted) {
        return res.status(204).send("Post deleted");
      }
      throw new Error("Post not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

app.all('/test', (req, res)=>{
res.status(200).json({message: 'OK'});
})

app.post('/posts', createPost);
app.get('/posts', getAllPosts);
app.get('/posts/:postId', getPostById);
app.put('/posts/:postId', updatePost);
app.delete('/posts/:postId', deletePost);

http.createServer(app).listen(3000, () => {
console.log('Server is working on port 3000');
})



