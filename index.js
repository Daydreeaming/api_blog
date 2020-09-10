const helper = require("./helper");
const autorFuncoes = require("./autor.js")
const postFuncoes = require("./posts.js")
const fs = require("fs");

autorFuncoes.criarAutor(
    {
        idAutor: "10",
        primeiroNome:"Lucas",
        ultimoNome: "Dantas",
        email: "amigao@hotmail.com",
        senha: "amigao123"
    }
);

autorFuncoes.atualizacaoAutor('10', 'xablau', 'amigaaaao@hotmail.com');
postFuncoes.atualizacaoPoster

console.log(autorFuncoes.authors)

autorFuncoes.criarAutor(
    {
        idAutor: "15",
        primeiroNome:"Mateus",
        ultimoNome: "Dantas",
        email: "amigao@hotmail.com",
        senha: "amigao123"
    }
);

// postFuncoes.criarPost(
//     {
//         idPost: "25",
//         tituloPost: "Amigao?",
//         subTituloPost: "amigao?2",
//         idDoAutorDoPost:"10",
//         publicado: false,
//         deletado: false
//     }
// )

// postFuncoes.criarPost(
//     {
//         idPost: "50",
//         tituloPost: "Este post é novo?",
//         subTituloPost: "big friend??",
//         idDoAutorDoPost:"15",
//         publicado: false,
//         deletado: false
//     }
// )