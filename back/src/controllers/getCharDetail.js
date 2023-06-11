const axios = require("axios");



const getCharDetail = (res , id) => {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
    .then(response => response.data)
    .then(data=>{
        let character ={
            name : data.name,
            origin : data.origin.name,
            image : data.image,
            gender : data.gender,
            species : data.species,
            status : data.status
        }
        res
        .writeHead(200,{ "Content-type" : "application/json"})
        .end(JSON.stringify(character))
    })
    .catch( err =>
        res
        .writeHead(500,{ "Content-type" : "text/plain" })
        .end(`El personaje con el id:${id} no existe`)
    )
}

module.exports = getCharDetail;