import Recipe from "../model/Recipe";

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
    const recipe = new Recipe({
        title,
        description,
        image,
        user
    })
    try{
        recipe.save();
    }catch(err){
        console.log(err)
        return res.send(err.message);
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
        recipe = await Recipe.findByIdAndDelete(recipeId)
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