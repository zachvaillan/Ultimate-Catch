# Ultimate Catch
The serious angler's best kept secret!
With an integrated Google Maps API, we've created a web and mobile friendly app that allows fishermen and fisherwomen to track their best fishing spots and share their 'Ultimate Catch'. Through social connectivity it creates a community of experienced and novice a fisherman alike, and allows them to share their photos, comments, likes, and tips.

### [Live Link](https://ultimatecatch2.herokuapp.com/#/)

![screenshot](img/obama.png)

## Features
 + GeoTagging with Google Maps API
 + Weather API
 + Posts/Likes
 + User Comments
 + User Follows
 + Search

 ## Technologies

<a href="#"><img src="img/mongo.png" height="90px"></a>
<a href="#"><img src="img/express.png" height="85px"></a>
<a href="#"><img src="img/react.png" height="83px"></a>
<a href="#"><img src="img/node.jpg" height="85px"></a>
<a href="#"><img src="img/maps.png" height="80px"></a>


## Implementation


### Database
Backend relational `database` model created to improve User experience.

```javascript
  //post.js
  const PostSchema = new Schema({
    users: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        handle: {
            type: String
        }
    }],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        handle: {
            type: String
        },
        text: {
            type: String
        }
    }],
    picture: {
        type: String
    },
    region: {
        type: Schema.Types.ObjectId,
        ref: 'regions'
    }
});
```

![Posts Demo](img/post-gif.gif)


### Routing

With the help of various `middlewares` such as: JWT, Passport, and Validator; `User Authenticated` pages are only rendered with proper credentials.  

```javascript

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.handle = "Incorrect email or password";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, handle: user.handle, email: user.email };

        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Incorrect email or password";
        return res.status(400).json(errors);
      }
    });
  });
});

```
