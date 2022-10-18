import express from "express";
import {
    getAllRecipes,
    getById,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getByUserId
} from "../controllers/recipe-controller";
 
const recipeRouter = express.Router();


recipeRouter.get("/",getAllRecipes)

recipeRouter.get("/:id", getById)

recipeRouter.get("/user/:id", getByUserId)

recipeRouter.post("/add",addRecipe)

recipeRouter.put("/update/:id",updateRecipe)

recipeRouter.delete("/delete/:id", deleteRecipe);


export default recipeRouter;