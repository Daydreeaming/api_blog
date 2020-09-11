const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const fs = require("fs")
const autorFuncoes = require('./autor.js');
const postFuncoes = require('./posts.js');
const server = new koa();

server.use(bodyparser())


// controlador do Autor //

controladorPOSTAutor = (ctx) => {
    const pathArquivoAutor = ('./blogAutores.json');
    const file = fs.readFileSync(pathArquivoAutor, 'utf8')

    const JSONFile = JSON.parse(file)
    const body = ctx.request.body;

    console.log(body)

    const criacaoDeAutor = autorFuncoes.criarAutor(body);
    
    if (criacaoDeAutor) {
        JSONFile.push(criacaoDeAutor);
        fs.writeFileSync(pathArquivoAutor, JSON.stringify(JSONFile, null, 4), 'utf8')
        ctx.status = 200;
        ctx.body = criacaoDeAutor
    } else {
        ctx.status = 500;
        ctx.body = 'Não foi possível criar autor'
    }
}

controladorGETAutor = (ctx) => {
    const id = ctx.url.split("/")[2];
    const pathArquivoAutor = ('./blogAutores.json');
    const autorFile = fs.readFileSync(pathArquivoAutor, 'utf8');
    const JSONAutorFile = JSON.parse(autorFile.toString())

    console.log(id)

    if (id) {
        const idObtido = autorFuncoes.pegarAutor(id, JSONAutorFile)
        if (idObtido) {
            ctx.body = idObtido.informacoes
        } else {
            ctx.status = 500;
            ctx.body = 'Autor não encontrado';
        }
    } else {
        ctx.body = autorFuncoes.pegarAutor();
    }
}

controladorDELETEAutor = (ctx) => {
    const id = ctx.url.split("/")[2];
    const pathArquivoAutor = ('./blogAutores.json');
    const pathArquivoPost = ('./blogPost.json');
    const autorFile = fs.readFileSync(pathArquivoAutor, 'utf8');
    const postFile = fs.readFileSync(pathArquivoPost, 'utf8');

    const JSONAutorFile = JSON.parse(autorFile.toString())
    const JSONPostFile = JSON.parse(postFile.toString())

    console.log(id);

    if (id) {
        const idObtido = autorFuncoes.deletarAutor(id, JSONAutorFile, JSONPostFile);
        if (idObtido === false) {
            ctx.status = 500;
            ctx.body = "Não foi possível encontrar o ID do autor desejado!"
        } else {
            ctx.body = "Autor deletado!"
            fs.writeFileSync(pathArquivoAutor, JSON.stringify(JSONAutorFile, null, 4), 'utf8');
        }
    } 
};
// }

// controlador do Post // 

controladorPOSTPost = (ctx) => {
    const pathArquivoAutor = ('./blogAutores.json');
    const pathArquivoPost = ('./blogPost.json');
    const postFile = fs.readFileSync(pathArquivoPost, 'utf8');
    const autorFile = fs.readFileSync(pathArquivoAutor, 'utf8');

    console.log(autorFile.toString())

    const JSONAutorFile = JSON.parse(autorFile.toString())
    const JSONPostFile = JSON.parse(postFile.toString())
    const body = ctx.request.body;

    console.log(JSONAutorFile)
    console.log(body)

    const criacaoDePost = postFuncoes.criarPost(body, JSONAutorFile);
    
    if (criacaoDePost) {
        JSONPostFile.push(criacaoDePost);
        fs.writeFileSync(pathArquivoPost, JSON.stringify(JSONPostFile, null, 4), 'utf8')
        ctx.status = 200;
        ctx.body = criacaoDePost
    } else {
        ctx.status = 500;
        ctx.body = 'Não foi possível criar post'
    }
}

controladorGETPosts = () => {
    const id = ctx.url.split("/")[1]; 
    const pathArquivoPost = ('./blogPost.json');
    const postFile = fs.readFileSync(pathArquivoPost, 'utf8');
    const JSONPostFile = JSON.parse(postFile.toString())

    console.log(id)

    if (id) {
        const idObtido = postFuncoes.pegarPost(id, JSONPostFile)
        if (idObtido) {
            ctx.body = idObtido.informacoes
        } else {
            ctx.status = 500;
            ctx.body = 'Post não encontrado';
        }
    } else {
        ctx.body = postFuncoes.pegarPost();
    }
}

controladorGETPost = (ctx) => {
    const id = ctx.url.split("/")[2];
    const pathArquivoPost = ('./blogPost.json');
    const postFile = fs.readFileSync(pathArquivoPost, 'utf8');
    const JSONPostFile = JSON.parse(postFile.toString())

    console.log(id)

    if (id) {
        const idObtido = postFuncoes.pegarPost(id, JSONPostFile)
        if (idObtido) {
            ctx.body = idObtido.informacoes
        } else {
            ctx.status = 500;
            ctx.body = 'Post não encontrado';
        }
    } else {
        ctx.body = postFuncoes.pegarPost();
    }
}

server.use((ctx) => {

    const pathArquivoAutor = ('./blogAutores.json');
    const pathArquivoPost =('./blogPost.json');

    if (!fs.existsSync(pathArquivoAutor)) {
        fs.writeFile(pathArquivoAutor,  '[]', 'utf8', (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Arquivo de autor criado com sucesso')
            }
        })
    }

    if (!fs.existsSync(pathArquivoPost)) {
        fs.writeFile(pathArquivoPost,  '[]', 'utf8', (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Arquivo de post criado com sucesso')
            }
        })
    }

    const method = ctx.method
    const path = ctx.path

    if (path.includes('/autor')) {
        if (method === 'POST') {
            controladorPOSTAutor(ctx);
        } else if (method === 'GET') {
            controladorGETAutor(ctx);
        } else if (method === 'DELETE') {
            controladorDELETEAutor(ctx);
        } else if (method === 'PUT') {
            controladorPUTAutor(ctx);
        }
    } else if (path.includes('/post')) {
        if (method === 'POST') {
            controladorPOSTPost(ctx);
        } else if (method === 'GET') {
                controladorGETPost(ctx);
        } else if (method === 'DELETE') {
            controladorDELETEPost(ctx);
        } else if (method === 'PUT') {
            controladorPUTPost(ctx);
        }
    }
});

server.listen(8081, () => console.log('Rodando na porta 8081'));