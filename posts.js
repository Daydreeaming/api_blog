const helper = require("./helper");
const autorFuncoes = require("./autor.js")
const fs = require("fs");

const posters = [];

const postExiste = (post) => {
    for (let i = 0; i < posters.length; i++) {
        if (posters[i].idPost === post.idPost) {
            console.log("Este post já existe")
            return true
        }
    }
    return false
}

const criarPost = (post) => {

    const existePost = postExiste(post);

    if (existePost) {
        return     
    }

    const autor = autorFuncoes.pegarAutor(post.idDoAutorDoPost);

    if (autor === null || autor.deletado === true) {
        console.log('Proibido criar post!');
        return
    }

    const novoPost = {
        idPost: post.idPost,
        tituloPost: helper.limpaTexto(post.tituloPost),
        subTituloPost: helper.limpaTexto(post.subTituloPost),
        idDoAutorDoPost: helper.formatarEmail(post.idDoAutorDoPost),
        publicado: true,
        deletado: false
    };

    console.log("Post criado!")
    posters.push(novoPost)
    return novoPost
}

const pegarPost = (idPost) => {

    for (let i = 0; i < posters.length; i++) {
        if (idPost === posters[i].idPost) {
            console.log(`O Post é ${posters[i].tituloPost} ${posters[i].subTituloPost}`)
            return posters[i]
        }
    }
    console.log('Não existe autor!')
    return null
}

const deletarPost = (idPost) => {

    let poster = pegarPost(idPost);

    if (poster === null) {
        return
    }

    posters.forEach((post) => {
        if (post.idPost === poster.idPost && post.deletado === false) {
            console.log('Post está sendo deletado!!')
            poster.publicado = false
            poster.deletado = true
        } else {
            console.log('Este poster não existe!')
        }
    });
};


const atualizacaoPost = (idPost, atributoAModificar, modificacao) => {

    let poster = pegarPost(idPost);
    let valorAntigo

    if (poster === null) {
        return
    }

    if (atributoAModificar === 'idPost' ) {
        console.log("Proibido mudar idPost!!")
        return
    }

    for (let i  = 0; i < posters.length; i++) {
        if (poster.idPost === posters[i].idPost) {
            if (posters[i].hasOwnProperty(atributoAModificar)) {
                valorAntigo = posters[i][atributoAModificar]
                posters[i][atributoAModificar] = modificacao
                console.log(`O post foi atualizado! Modificou o ${atributoAModificar} de ${valorAntigo} para ${modificacao}`)
                return 
            } else {
                console.log('Atributo não existe!')
                return
            }
        }
    }
}


autorFuncoes.criarAutor({
        idAutor: '10',
        primeiroNome:'Lucas',
        ultimoNome: 'Dantas',
        email: 'amigao@hotmail.com',
        senha: 'amigao123'
    });


autorFuncoes.criarAutor(
    {
        idAutor: '15',
        primeiroNome:'Mateus',
        ultimoNome: 'Dantas',
        email: 'amigao@hotmail.com',
        senha: 'amigao123'
    }
);

criarPost(
    {
    idPost: '25',
    tituloPost: 'Amigao?',
    subTituloPost: 'Você é mesmo meu amigao??',
    idDoAutorDoPost:'10',
    publicado: true,
    deletado: false
    }
)

criarPost(
    {
    idPost: '50',
    tituloPost: 'Este post é novo?',
    subTituloPost: 'big friend??',
    idDoAutorDoPost:'10',
    publicado: true,
    deletado: false
    }
)

criarPost(
    {
    idPost: '64564',
    tituloPost: 'O rato roeu xablau',
    subTituloPost: 'Rato borrachudo',
    idDoAutorDoPost:'15',
    publicado: true,
    deletado: false
    }
)

criarPost(
    {
    idPost: '453',
    tituloPost: 'Meu amigo caio nao quer mais me ajudar em backend',
    subTituloPost: 'Meu amigo caio',
    idDoAutorDoPost:'15',
    publicado: true,
    deletado: false
    }
)

module.exports = {
    posters: posters,
    postExiste: postExiste,
    criarPost: criarPost,
    pegarPost: pegarPost,
    deletarPost: deletarPost,
    atualizacaoPost: atualizacaoPost
};

console.log(posters)