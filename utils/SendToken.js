exports.SendToken = (Student,statuCode,res)=>{
    const token = Student.generatejwt();
    const options={
        expires: new Date(Date.now() + 24*60*60*1000),
        // httpOnly: true,
        secure:true
    }

    res.status(statuCode).cookie("token",token,options).json({
        status:"success",
        id : Student._id,
        token
    })
}