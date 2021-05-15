const router = require('express').Router()
let Blog = require('../models/blog')

//get all blogs
router.route('/').get((req, res) => {
  Blog.find()
    .then((blogs) => res.json(blogs))
    .catch((err) =>
      res.status(400).json('Error while fetching all the blogs: ' + err)
    )
})

//get a blog by id
router.get('/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (blog) return res.status(200).json({ blog, msg: 'Blog found!!' })
      else return res.status(200).json('No data found!! ')
    })
    .catch((err) => res.status(400).json('Error while fetching a blog: ' + err))
})

//add a blog
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

//edit a blog by id
router.put('/:id', (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((blog) => {
      if (blog) {
        return res
          .status(200)
          .json({ blog, success: true, msg: 'Blog successfully updated!' })
      } else {
        return res
          .status(200)
          .json({ success: false, msg: 'No such data exist' })
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

//delete a blog by id
router.delete('/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((blog) => res.status(400).json({ blog, msg: 'Blog Deleted!' }))
    .catch((err) =>
      res.status(400).json('Could not delete blog due to: ' + err)
    )
})

module.exports = router
