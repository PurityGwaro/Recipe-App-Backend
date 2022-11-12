import User from "../model/User";
import bcrypt from "bcryptjs"

// get all users
export const getAllUsers = async (req,res,next) => {
    let users;
    // always use the try catch block when dealing with the database
    try{
        users = await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message: "No Users Found"});
    }
    return res.status(200).json({users: users});  
}

// sign up a user
export const signup = async (req,res,next) =>{
    console.log(req.body);
    // first get details sent from the frontend for creating the user. Get everything from the req.body
    // destructure things you'll get from the req.body
    const { name, email, password } = req.body;
    // if user already exists do some validation
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }catch(err){
       return console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message: "The User Already Exists ! Login instead"});
    }
    // create a new user if the user doesn't exist
    // hash the user's password
    const hashedPass = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPass,
        recipes:[]
    })
     

    // save the new user
    try{
        await user.save();
    }catch(err){
        return console.log(err);
    }
    return res.status(201).json({user})
}

// login 
export const login = async (req,res,next)=>{
    console.log('log in started');
    const { email, password } = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }catch(err){
       return console.log(err);
    }
    if(!existingUser){
        return res.status(404)
        .json({message: "The User Does Not Exist ! Sign Up instead"});
    }

    // compare the password using a function from bcrypt
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400)
        .json({message: "Incorrect Password!!"})
    }
    return res.status(200)
    .json({message: "LogIn Successfull!"})
}