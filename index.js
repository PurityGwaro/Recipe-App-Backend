import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import recipeRouter from "./routes/recipe-routes"

const app = express();
const db = "mongodb+srv://puritygwaro:db1234@cluster0.kw2y3g6.mongodb.net/RecipeApp?retryWrites=true&w=majority";
const port = 5000;

// // middleware - used for handling some tasks in the app
// app.use("/api",(req,res,next) =>{
//     res.send("Hello World");
// });

// must have this middleware to allow the app to always know it's getting json data
app.use(express.json());

app.use("/api/user", router)

app.use("/api/recipe",recipeRouter)

// mongoose.connect returns a promise
mongoose.connect(db)
.then(()=>app.listen(port))
.then(()=>{
    console.log(`connected to port ${port} and mongodb`)
})
.then(err =>{
    if(err){
        return console.log(err);
    }
    return console.log("There were no errors found while connecting to the database and the localhost");
})

