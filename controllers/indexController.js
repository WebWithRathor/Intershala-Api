const { CatchAsyncError } = require("../middlewares/CatchAsyncError")

exports.homepage = CatchAsyncError(async (req,res,next)=>{
    res.json({"love" : 'Astha Lodhi I LOVE U ❤️'})
});