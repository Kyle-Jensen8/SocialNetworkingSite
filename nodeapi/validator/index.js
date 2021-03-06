exports.createPostValidator = (req, res, next) => {
    //title
    req.check("title", "Write a title").notEmpty();
    req.check("title", "Title must be between 4 and 150 chars").isLength({
        min: 4, max: 150
    });

    //body
    req.check("body", "Write a body").notEmpty();
    req.check("body", "body must be between 4 and 2000 chars").isLength({
        min: 4, max: 2000
    });

    // check for errors
    const errors = req.validationErrors();
    // if errors show first
    if(errors){
        firstError = errors.map(err => err.msg)[0];
        return res.status(400).json({error: firstError});
    }
    // proceed to next middleware
    next();
}

exports.userSignupValidator = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check("name", "Name is required.").notEmpty();

    // email is not null, valid and normalized
    req.check("email", "Email must be between 3-32 characters.")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min: 4,
        max: 2000
    });
    // check for password 
    req.check("password", "Password is required.").notEmpty();
    req.check("password")
    .isLength({min: 6})
    .withMessage("Password must constain at least 6 characters.").notEmpty()
    .matches(/\d/)
    .withMessage("Password must contain a number");
    // check for errors
    const errors = req.validationErrors();
    // if errors show first
    if(errors){
        firstError = errors.map(err => err.msg)[0];
        return res.status(400).json({error: firstError});
    }
    // proceed to next middleware
    next();
}