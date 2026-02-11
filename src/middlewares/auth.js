const adminAuth = (req,res,next) =>{
    console.log("Admin auth is getting checked.");
    const token="xyz";
    const isadmin=token==="xyz";
    
    if(!isadmin)
    {
        res.status(401).send("Unauthorized Access");
    }
    else
    {
        next();
    }
}

const userAuth = (req,res,next) =>{
    console.log("Admin auth is getting checked.");
    const token="xyz";
    const isadmin=token==="xyz";
    
    if(!isadmin)
    {
        res.status(401).send("Unauthorized Access");
    }
    else
    {
        next();
    }
}


module.exports = {
    adminAuth,userAuth
};