const router = require('express').Router()
let Blog = require('../models/blog')

router.route('/').get((req, res) => {
  Blog.find()
    .then((blogs) => res.json(blogs))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const date = Date.parse(req.body.date)
  const title = req.body.title
  const author = req.body.author
  const content = req.body.content

  const newBlog = new Blog({
    date,
    title,
    author,
    content
  })
  newBlog
    .save()
    .then(() => res.json('Blog added!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router
