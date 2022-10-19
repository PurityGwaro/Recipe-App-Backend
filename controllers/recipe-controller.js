import mongoose from "mongoose";
import Recipe from "../model/Recipe";
import User from "../model/User";

// fetch all recipes
export const getAllRecipes = async (req,res,next) =>{
    let recipes;
    try{
        recipes = await Recipe.find();
    }catch(err){
        return console.log(err);
    }
    if(!recipes){
        return res.status(404)
        .json({message: "No Recipes Found !!"})
    }
    return res.status(200)
    .json({recipes: recipes})
}

export const getById = async (req,res,next) =>{
    const recipeId = req.params.id;
    let recipe;
    try{
        recipe = await Recipe.findById(recipeId)
    }catch(err){
        return console.log(err);
    }
    if(!recipe){
        return res.status(404).json({message:"cannot find the recipe you're looking for"})
    }
    return res.status(200).json({recipe})
}

export const addRecipe = async (req,res,next) =>{
    const { title, description, image, user } = req.body;
    // console.log(req.body.user);
    let existingUser;
    try{
        existingUser = await User.findById(user)
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(404).
        res.json({mess:"Unable to Find user by this id"})
    }
    const recipe = new Recipe({
        title,
        description,
        image,
        user
    })
    try{
        // await recipe.save();
        // instead of directly saving the blog we need to add the blog to the users as well
        // start a session and do everything in it then abort it
        const session =  await mongoose.startSession()
        session.startTransaction()
        await recipe.save({session})
        // push to the array of the existing user
        existingUser.recipes.push(recipe)
        // save to the user and save from this session only
        await existingUser.save({session}) 
        // if everything is okay commit transaction
        await session.commitTransaction()
        
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:`this is the err: ${err}`})
    }
    return res.status(200)
    .json({recipe})
}

export const updateRecipe =  async (req,res,next) =>{
    const {title, description} = req.body;
    const recipeId = req.params.id;
    let recipe;
    try{
        recipe = await Recipe.findByIdAndUpdate(recipeId,{
            title,
            description,
        });
    }catch(err){
        console.log(err);
        
        return res.json({err})
    }
    if(!recipe){
        return res.status(500)
        .json({message: "Unable to Update the Recipe"})
    }
    return res.status(200).json({recipe});
}

export const deleteRecipe = async (req,res,next) =>{
    const recipeId = req.params.id;
    let recipe;
    try{
        recipe = await Recipe.findByIdAndRemove(recipeId).populate("user")
        // console.log(recipe);
        await recipe.user.recipes.pull(recipe)
        await recipe.user.save()
    }catch(err){
        console.log(err);
        return res.json({err})
    }
    if(!recipe){
        return res.status(500)
        .json({message: "Unable to delete the recipe"})
    }
    return res.status(200).json({message: "Successfully deleted the recipe"});
}

export const getByUserId = async (req,res,next) =>{
    const userId =  req.params.id
    console.log(`this is the user Id: ${userId}`);
    let userRecipes;
    try{
        userRecipes = await User.findById(userId).populate("recipes")
    }catch(err){
        console.log(err);
    }
    if(!userRecipes){
        return res.status(404).json({msg:"No Recipes Found"})
    }
    return res.status(200).json({recipes: userRecipes})
}

