import mongoose from "mongoose"

mongoose.connect(process.env.URLDB || "mongodb+srv://sideInventarios:KqwPVgYVM669x9G5@cluster0.uobhh.mongodb.net/inventarios?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(db => {
        console.log("Database connected successfuly.")        
    }).catch(err => {
        console.log("Error tryning connect to database.")
    })