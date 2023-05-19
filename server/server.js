const express= require ("express")
const app= express()
const PORT=8585
const MongooseConnect="mongodb+srv://karimovainci:inci2003@cluster0.lidvhfa.mongodb.net/"
const mongoose=require("mongoose")
app.use(express.json())
const cors=require("cors")
app.use(cors())


const productSchema=mongoose.Schema({
    brend:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    context:{
        type:String,
        required:true
    }
})

const cardProduct=mongoose.model("cardProduct",productSchema)

app.post("/add",async (req,res)=>{
    const newpProdct=new cardProduct({
        ...req.body
    })
    await newpProdct.save()
    res.send(newpProdct)
})
app.get("/add",async (req,res)=>{
    const data=await cardProduct.find()
    res.send(data)
})
app.delete("/add/:id",async (req,res)=>{
    const {id }=req.params
    await cardProduct.findByIdAndDelete(id)
    res.send("product has been deleted")
})
app.put("/add/:id", async (req,res)=>{
    const {id}=req.params
    const updatedProduct=await cardProduct.findByIdAndUpdate(id,{...req.body})
})
mongoose.connect(MongooseConnect).then(()=>{
    console.log("DB CONNECTED")
})
app.listen(PORT,()=>{
    console.log("App running")
})