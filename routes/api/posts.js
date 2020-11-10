const express = require("express");
const router = express.Router();
const Post = require("../../models/Post")
const Region = require("../../models/Region")
const passport = require("passport");
const validatePostInput = require("../../validation/posts")
// ObjectID = require('mongodb').ObjectID

router.get("/test", (req, res) => res.json({ msg: "This is the posts route" }));

router.get("/", (req, res) => {
    Post
        .find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json(err));
});

router.get("/user/:user_id", (req, res) => {
    Post 
        .find({ user: req.params.user_id })
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json(err));
});

router.get("/region/:region_id", (req, res) => {
    // console.log("IN REGION/REGIONID-=-=-=-=-=-=-=-=-")
    // console.log(new ObjectID(req.params.region_id))
    Post 
        .find({ region: req.params.region_id })
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json(err));
});

router.post("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { isValid, errors } = validatePostInput(req.body) 
    
        if(!isValid){
            return res.status(400).json(errors);
        }
        const newPost = new Post({
            users: req.user.id,
            text: req.body.text,
            picture: req.body.picture,
            handle: req.user.handle
        });

        newPost
            .save()
            .then(post => res.json(post))
    }
)

// router.put('/:id', 
//     passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//         console.log("reached inside of add likes to post")
//         // console.log(req)
//         console.log(req.params.id)
//         Post
//             .findById(req.params.id)
//             .then(post => post.likes.push(req.user._id))
//     }
// )

router.post('/like/:id',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            const newLike = {
                user: req.user.id,
                handle: req.user.handle
            }

            let likeCheck = false;
            
            post.likes.forEach(item => {
                if (String(item.user) === req.user.id){
                    likeCheck = true;
                }
            })

            if (!likeCheck){
                post.likes.unshift(newLike)
                post.save().then(post => res.json(post))
            }
      })
      .catch(err => res.status(404).json(err))
  })


  router.post('/unlike/:id',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.likes.forEach( (item, i) => {
                if (String(item.user) === req.user.id){
                    post.likes.splice(i, 1)
                }
            })

            post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json(err))
  })

router.post('/comment/:id',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
  Post.findById(req.params.id)
      .then(post => {
          const newComment = {
              user: req.user.id,
              handle: req.user.handle,
              text: req.body.text
          }

          post.comments.push(newComment)

          post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json(err))
})

module.exports = router;