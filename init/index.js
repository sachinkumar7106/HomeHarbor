const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

const mongoUrl="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongoUrl);
};

const initDB=async () => {
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:'6a4f80e11e10cda37c6dd5e5'}));
    await Listing.insertMany(initdata.data);
    console.log("Data Initialized");
};
 
initDB();