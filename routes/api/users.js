const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));


router.get('/search/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json({err}));
})

router.get('/:search', (req, res)  => {
  let query = req.params.search
  
  User.find({handle: { $regex: query } })
  .then(user => res.json(user))
  .catch(err => res.status(400).json({err}));
}); 

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
      id: req.user.id,
      handle: req.user.handle,
      email: req.user.email
    });
  })

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          // Throw a 400 error if the email address already exists
          return res.status(400).json({email: "A user has already registered with this address"})
        } else {
          // Otherwise create a new user
          const newUser = new User({
            handle: req.body.handle,
            email: req.body.email,
            password: req.body.password
          })

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            })
          })
        }
      })
  })


  router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // console.log(errors);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({email})
      .then(user => {
        if (!user) {
          return res.status(404).json({email: 'This user does not exist'});
        }
  
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
            const payload = {id: user.id, name: user.name};

            jwt.sign(
                payload,
                keys.secretOrKey,
                // Tell the key to expire in one hour
                {expiresIn: 3600},
                (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
              });
            } else {
                return res.status(400).json({password: 'Incorrect password'});
            }
        })
      })
  })

  router.post('/follow/:action_id/:current_id',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    User.findById(req.params.current_id)
        .then(currentUser => {
            const newFollower = {
                user: currentUser,
                handle: currentUser.handle
            }
            // console.log(currentUser)
            let followCheck = false;

            User.findById(req.params.action_id)
              .then(potentialFollow => {
                const newFollow = {
                  user: potentialFollow,
                  handle: potentialFollow.handle
                }
                
                potentialFollow.followers.forEach(follower => {
                  if (String(follower.user) === currentUser.id){
                      followCheck = true;
                  }
                })
  
                if (!followCheck){
                    potentialFollow.followers.unshift(newFollower);
                    currentUser.following.unshift(newFollow);
                    potentialFollow.save();
                    currentUser.save();
                }
              }) 
      })
      .catch(err => res.status(404).json(err))
  })

  router.post('/unfollow/:action_id/:current_id',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    User.findById(req.params.current_id)
      .then(currentUser => {
        User.findById(req.params.action_id)
          .then(actionUser => {
            actionUser.followers.forEach( (follower, i) => {
              if (String(follower.user) === currentUser.id){
                console.log("USER TO BE REMOVED");
                console.log(actionUser.followers.splice(i, 1));
              }
            });
            currentUser.following.forEach( (follow, i) => {
              if (String(follow.user) === actionUser.id){
                console.log("followed user getting removed")
                currentUser.following.splice(i, 1);
              }
            });
            console.log(currentUser);
            console.log(actionUser);
            currentUser.save();
            actionUser.save();
          })
      })
      .catch(err => res.status(404).json(err))
  })

module.exports = router;