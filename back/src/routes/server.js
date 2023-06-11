// const http = require("http");
// const getCharById = require("../controllers/getCharById");
// const getCharDetail = require("../controllers/getCharDetail")

// http
//     .createServer((req , res)=>{
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     let id = req.url.split("/").at(-1)
    
//     if(req.url.includes("onsearch")){
//         getCharById(res , id);
//     }
//     if(req.url.includes("detail")){
//         getCharDetail(res , id);
//     }

// }).listen(3001,"localhost");

const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');


app.use(cors())
app.use(express.json());

app.get('/rickandmorty/character/:id', async (req , res)=>{
    try {
        const { id }= req.params;

        const response = await axios(`https://rickandmortyapi.com/api/character/${id}`)
        const data = response.data;
        
        const infoCharacter ={
            id: data.id,
            name: data.name,
            species: data.species,
            gender: data.gender,
            image: data.image
        }
        
        res.status(200).json(infoCharacter);
    } catch (error) {
        res.status(404).send(error.message);
    }

})


app.get('/rickandmorty/detail/:detailID', async (req , res) => {
    try {
        const { detailID } = req.params;
        const response = (await axios(`https://rickandmortyapi.com/api/character/${detailID}`)).data;

        const infoCharacterDetail = {
            name: response.name,
            status: response.status,
            species: response.species,
            gender: response.gender,
            origin: response.origin.name,
            image: response.image
        }
        res.status(200).json(infoCharacterDetail);

    } catch (error) {
        res.status(404).send(error.message);
    }
})


let fav = [];

app.get('/rickandmorty/fav',  (req , res) => {
    res.status(200).json(fav);
})

app.post('/rickandmorty/fav' , (req , res) => {
    fav.push(req.body);

    res.status(200).send('Se guardarón correctamente');
})

app.delete('/rickandmorty/fav/:id' , (req , res) => {
    const { id } = req.params;

    const favFiltered = fav.filter(char => char.id !== parseInt(id));
    fav = favFiltered;

    res.status(200).send('Se elimino correctamente');
})


module.exports = app;