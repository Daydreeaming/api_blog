const helper = require("./helper");
const fs = require("fs");

const authors = [];

const autorExiste = (autor) => {
    for (let i = 0; i < authors.length; i++) {
        if (authors[i].idAutor === autor.idAutor) {
            console.log("Esse autor já existe")
            return true
        }
    }
    return false
}

const criarAutor = (autor) => {

    const existeAutor = autorExiste(autor)

    if (existeAutor) {
        return
    }

    const novoAutor = {
        idAutor: autor.idAutor,
        primeiroNome: helper.limpaTexto(autor.primeiroNome),
        ultimoNome: helper.limpaTexto(autor.ultimoNome),
        email: helper.formatarEmail(autor.email),
        senha: autor.senha,
        deletado: false
    };

    console.log("Autor criado!")
    // authors.push(novoAutor)
    return novoAutor
}

const pegarAutor = (idAutor, listaDeAutores) => {

    for (let i = 0; i < listaDeAutores.length; i++) {
        if (idAutor === listaDeAutores[i].idAutor) {
            console.log(`O autor é ${listaDeAutores[i].primeiroNome} ${listaDeAutores[i].ultimoNome}`)
            return listaDeAutores[i];
        }
    }
    console.log('Não existe autor!')
    return null
}

const deletarAutor = (idAutor, listaDeAutores, listaDePosts) => {

    let autor = pegarAutor(idAutor, listaDeAutores);
    if (autor === null) {
        return
    }

    for (const post of listaDePosts) {
        if (post.idDoAutorDoPost === autor.idAutor && post.publicado === true) {
            console.log ('Este autor possui post publicado');
            return false
        }
    }   


    for (let i = 0; i < listaDeAutores.length; i++) {
        if(listaDeAutores[i].idAutor === autor.idAutor){
            console.log('Deletando autor')
            listaDeAutores[i].deletado = true;
            // listaDeAutores.splice(author, 1)
            return true
        } 
    }
    return false
};

const atualizacaoAutor = (idAutor, atributoAModificar, modificacao, listaDeAutores) => {

    let autor = pegarAutor(idAutor, listaDeAutores);

    if (autor === null) {
        return
    }

    if (atributoAModificar === 'idAutor' ) {
        console.log("Proibido mudar idAutor!!")
        return
    }

    for (let i  = 0; i < authors.length; i++) {
        if (autor.idAutor === authors[i].idAutor) {
            if (authors[i].hasOwnProperty(atributoAModificar)) {
                authors[i][atributoAModificar] = modificacao
                return 
            } else {
                console.log('Atributo não existe!')
                return
            }
        }
    }
}


module.exports = {
    authors: authors,
    autorExiste: autorExiste,
    criarAutor: criarAutor,
    pegarAutor: pegarAutor,
    deletarAutor: deletarAutor,
    atualizacaoAutor: atualizacaoAutor
};

// const verificarExistenciaAutor = (idAutor) => {

//     for (let i = 0; i < authors.length; i++) {
//         if (idAutor === authors[i].idAutor) {
//             console.log(`O autor é ${authors[i].primeiroNome} ${authors[i].ultimoNome}`)
//             return true
//         }
//     }
//     console.log('Não existe autor!')
//     return false
// }