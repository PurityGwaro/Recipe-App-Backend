import express from "express";
import {
    getAllRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe
} from "../controllers/recipe-controller";
 
const recipeRouter = express.Router();


recipeRouter.get("/",getAllRecipes)

recipeRouter.post("/add",addRecipe)

recipeRouter.put("/update/:id",updateRecipe)

recipeRouter.post("/delete/:id", deleteRecipe);


export default recipeRouter;