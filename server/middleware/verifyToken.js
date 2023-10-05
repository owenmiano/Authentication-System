const  JWT =require('jsonwebtoken')

const verifyToken =async (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
     await JWT.verify(token, process.env.TOKEN, (err, user) => {
        if (err) return res.status(403).json({message:"You are not authenticated!"});
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({message:"You are not !"});
    }
  };


  module.exports={
    verifyToken
}