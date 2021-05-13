const router = require('express').Router()
let Blog = require('../models/blog')

router.route('/').get((req, res) => {
  Blog.find()
    .then((blogs) => res.json(blogs))
    .catch((err) =>
      res.status(400).json('Error while fetching all the blogs: ' + err)
    )
})

router.get('/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (blog) return res.status(200).json({ blog, msg: 'Blog found!!' })
      else return res.status(200).json('No data found!! ')
    })
    .catch((err) => res.status(400).json('Error while fetching a blog: ' + err))
})

router.route('/add').post((req, res) => {
  const { title, author, content } = req.body

  const newBlog = new Blog({
    title,
    author,
    content
  })
  newBlog
    .save()
    .then((blog) => res.status(200).json({ blog, msg: 'Blog added!!' }))
    .catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router
