exports.Generatederror = (err, req, res, next) => {
    res.status(err.status || 500);

    if(err.name === 'MongoServerError' && err.message.includes("E11000 duplicate key error collection")){
        err.message = "Student with this email already exists"
    }

    res.json({
        error: {
            message: err.message,
            name: err.name,
        }
    })
}