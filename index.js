import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
app.use(cors());
app.use(json());
dotenv.config({
  path: "./config/config.env",
});
app.get("/", async(req, res) => {
    
    // console.log(req.body);
    // const {country,category,PageValue,Page}=req.body;
    const country=req.body.country;
    const category=req.body.category;
    const PageValue=req.body.PageValue;
    const Page=req.body.Page;
  const TempUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.API_KEY}&pagesize=${PageValue}&language=en&page=${Page}`;
  try{
    console.log(TempUrl);
    let tempData=await fetch(TempUrl);
    console.log(tempData);
        let finData=await tempData.json();
        console.log(finData);
        res.send(finData);
  }
    catch(err)
    {
      console.log(err);
        res.json({"staus":"error",error:err});
    }
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`server started on port ${process.env.PORT}`);
});
