import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";


const port = 3000 || process.env.PORT;
const app = express();
const API_URL = "https://lrclib.net"

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req,res) =>{
    res.render("index.ejs");
});

app.post("/search", async (req,res) =>{
    let search = req.body["search"];
    try{
        const request = await axios.get(API_URL +`/api/search?q=${search}`)
        const response = {results: request.data};
        res.render("index.ejs", response);
    } catch(error){
        console.log("error")
        res.status(500).json({error: "Search Failed!"});       
    }
})

app.post("/song-details", async (req,res) =>{
    let songId = req.body["id"];
    console.log(songId);
    try{
        const request = await axios.get(API_URL + `/api/get/${songId}`);
        const response = {songDetails: request.data};
        res.render("song.ejs", response);
    } catch(error){
        console.log("error")
        res.status(500).json({error: "Failed to load song details!"});       
    }
})


app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});