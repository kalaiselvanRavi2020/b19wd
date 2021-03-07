const  express =require('express');
const app=express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin:"https://cranky-stonebraker-beedd0.netlify.app"
}))

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
// const dbUrl="mongodb://localhost:27017";
const dbUrl="mongodb+srv://kalaiselvan:Kalaiselvan@cluster0.clbcj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


let students=[];


app.get ("/students",async(req,res)=>{
    try{
        let client = await mongoClient.connect(dbUrl);
        let db = client.db('b19wd');
         students=await db.collection('students').find().toArray();
        client.close();
        res.json(students);
    }
    catch(error){
        console.log(error);
        res.json({
            message:"something went wrong"
        })
    }
})

app.get("/student/:id",async(req,res)=>{
    try{
let client = await mongoClient.connect(dbUrl);
let db =client.db('b19wd');
let id =mongodb.ObjectID(req.params.id);
let student = await db.collection("students").findOne({_id:id});
client.close();
res.json(student)

}
   catch(error){
        console.log(error);
        res.json({
            message:"something went wrong"
        })
    }
})
 


app.post("/student",async(req,res)=>{
    try{
    let client = await mongoClient.connect(dbUrl);
    let db= client.db('b19wd');
   await db.collection('students').insertOne({name:req.body.name,age:req.body.age});
    client.close();
    res.json({
        message:"success"
    })
}
catch(error){
    console.log(error);
    res.json({
        message :"something went wrong"
    })
}
})


app.put("/student/:id",async(req,res)=>{
try{
    let client = await mongoClient.connect(dbUrl);
    let db =client.db('b19wd');
    let id = mongodb.ObjectID(req.params.id);
    let student = await db.collection("students").updateOne({_id:id},{$set:{name:req.body.name}})
    client.close()
    res.json(student)

}catch(error){
    console.log(error)
    res.json({
        message : " problem in updating"
    })
}
})

app.put("/student/:id/age",async(req,res)=>{
    try{
        let client = await mongoClient.connect(dbUrl);
        let db =client.db('b19wd');
        let id = mongodb.ObjectID(req.params.id);
        let student = await db.collection("students").updateOne({_id:id},{$set:{age:req.body.age}})
        client.close()
        res.json(student)
    
    }catch(error){
        console.log(error)
        res.json({
            message : " problem in updating"
        })
    }
    })


    app.delete('/student/:id',async(req,res)=>{
        
        try{
            let client = await mongoClient.connect(dbUrl);
        let db=client.db('b19wd');
        let id =mongodb.ObjectID(req.params.id);
        let student=await db.collection("students").findOneAndDelete({_id:id})
        client.close()
        res.json(student);
        }
        catch(error){
            console.log(error)
            res.json({
                message:"record is not deleted"
            })
        }
    
    
    })
    


let port=3000;
app.listen(process.env.PORT || port,()=>{
    console.log(`app is running @${port}`);
})