class Task {
    constructor(titulo, descricao, imagem, cor, categoria, prioridade, id, data) {
        this.titulo = titulo
        this.descricao = descricao
        this.imagem = imagem
        this.cor = cor
        this.categoria = categoria
        this.prioridade = prioridade
        this.id = id
        this.data = data
    }
}

function gravar(tarefa) {
    // recupera o id gravado em LocalStorage e o atualiza depois da inserção da tarefa.
    let id = parseInt(localStorage.getItem('id'))
    localStorage.setItem(`task_${id}`, JSON.stringify(tarefa))
    id += 1
    localStorage.setItem('id', `${id}`)
}

let id_tarefa = 0

function capturarDados() {
    let titulo = document.getElementById('titulo').value
    let descricao = document.getElementById('descricao').value
    let cor = document.getElementById('cor').value
    let categoria = document.getElementById('selecionar-categorias').value
    categoria = localStorage.getItem(`${categoria}`)
    let prioridade = document.getElementById('prioridade').value
    let id = id_tarefa
    id_tarefa += 1
    let data = document.getElementById('data').value

    if (document.getElementById('imagem').value != '') {
        var imagem = document.getElementById('imagem').value
    }
    
    // criando um objeto a partir da classe Task, usando as variáveis declaradas acima

    let tarefa = new Task(titulo, descricao, imagem, cor, categoria, prioridade, id, data)

    // verificar se os campos não estão vazios e exibir modal interativo
    
    if (titulo != '' && descricao != '') { // sucesso
        gravar(tarefa)
        // criando modal
        let modal = new bootstrap.Modal(document.getElementById('modal'))
        document.getElementById('titulo-modal').innerHTML = 'Sucesso'
        document.getElementById('conteudo-modal').innerHTML = 'A tarefa foi adicionada! Veja todas as suas tarefas em "Consultar"'
        document.getElementById('botao-modal').innerHTML = 'Fechar'
        modal.show()
        document.getElementById('titulo').value = ''
        document.getElementById('descricao').value = ''
        document.getElementById('imagem').value = ''
    }
    else { // erro
        // criando modal
        let modal = new bootstrap.Modal(document.getElementById('modal'))
        document.getElementById('titulo-modal').innerHTML = 'Erro'
        document.getElementById('conteudo-modal').innerHTML = 'A tarefa não foi adicionada pois existem campos obrigatórios vazios. Corrija-os e tente novamente.'
        document.getElementById('botao-modal').innerHTML = 'Fechar e corrigir'
        modal.show()
    }
}

function adicionarCategoria(id_categoria) {
    let id = parseInt(id_categoria)
    let categoria = document.getElementById('adicionar-categoria').value
    if (categoria != '') {
        localStorage.setItem(`categoria_${id_categoria}`, `${categoria}`)
        id += 1
        localStorage.setItem(`id_categoria`, `${id}`)

        // criando modal
        let modal = new bootstrap.Modal(document.getElementById('modal'))
        document.getElementById('titulo-modal').innerHTML = 'Sucesso'
        document.getElementById('conteudo-modal').innerHTML = 'Categoria criada com sucesso.'
        document.getElementById('botao-modal').innerHTML = 'Fechar'
        document.getElementById('botao-modal').setAttribute('onclick', 'window.location.reload()')
        modal.show()
    }
    else {
        let modal = new bootstrap.Modal(document.getElementById('modal'))
        document.getElementById('titulo-modal').innerHTML = 'Erro'
        document.getElementById('conteudo-modal').innerHTML = 'Campo vazio.'
        document.getElementById('botao-modal').innerHTML = 'Fechar'
        modal.show()
    }
}

function lerCategorias(id_categoria) {
    if (document.getElementById('remover-categorias')) {
        for (let index = 0; index < id_categoria; index++) {
            let categoria = localStorage.getItem(`categoria_${index}`)
            let select = document.getElementById('remover-categorias')
            let option = document.createElement('option')
            option.value = `categoria_${index}`
            option.id = `categoria_${index}`
            option.innerHTML = categoria
            select.appendChild(option)
        }
    }
    if (document.getElementById('selecionar-categorias')) {
        for (let index = 0; index < id_categoria; index++) {
            let categoria = localStorage.getItem(`categoria_${index}`)
            let select = document.getElementById('selecionar-categorias')
            let option = document.createElement('option')
            option.value = `categoria_${index}`
            option.id = `categoria_${index}`
            option.innerHTML = categoria
            select.appendChild(option)
        }
    }
}

function removerCategoria() {
    var categoria = document.getElementById('remover-categorias').value
    // remover do localStorage
    localStorage.removeItem(categoria)
    // remover do DOM
    document.getElementById(categoria).remove()
    // decrementar o contador de categorias em 1 unidade
    var id_categoria = parseInt(localStorage.getItem('id_categoria'))-1
    localStorage.setItem('id_categoria', `${id_categoria}`)

    // ajustar as chaves do localStorage

    for (let index = parseInt(categoria.replace('categoria_', ''))+1; index <= id_categoria; index++) {
        let valor = localStorage.getItem(`categoria_${index}`)
        localStorage.removeItem(`categoria_${index}`)
        localStorage.setItem(`categoria_${index-1}`, `${valor}`)
    }

    window.location.reload()
}

function mostrarTarefas(id = parseInt(localStorage.getItem('id'))) {
    for (let index = 0; index < id; index++) {
        var obj = localStorage.getItem(`task_${index}`)
        obj = JSON.parse(obj)
        criarCard(obj)
    }
}

function criarCard(obj) {
    // atribui a Div já criada no HTML a uma variável divCard
    var divCard = document.getElementById('cards')
    // cria o card inicial
    var card = document.createElement('div')
    // adiciona algumas classes ao card (ainda vazio)
    card.classList.add('card')
    card.classList.add('col-md-4')
    card.classList.add('col-lg-3')
    card.classList.add('mb-3')
    card.id = obj.id
    // caso tenha alguma imagem, adiciona a imagem ao card
    if (obj.imagem) {
        var img = document.createElement('img')
        img.src = `${obj.imagem}`
        img.classList.add('card-img-top')
        card.appendChild(img)
    }
    // cria o body do card
    var cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    card.appendChild(cardBody)
    // configurações do título do card
    var titulo = document.createElement('h1')
    titulo.classList.add('card-title')
    titulo.classList.add('titulo-card')
    titulo.innerHTML = `${obj.titulo}`
    titulo.style.backgroundColor = `${obj.cor}`
    if (obj.cor != '#ffffff') {
        titulo.style.color = 'white'
    }
    cardBody.appendChild(titulo)

    // configurações do botão de fechar do card
    var fechar = document.createElement('button')
    fechar.classList.add('btn-close')
    fechar.classList.add('botao-fechar')
    fechar.setAttribute('onclick', `apagarCard(${obj.id})`)
    card.appendChild(fechar)
    // configurações dos textos do body do card
    var texto = document.createElement('p')
    texto.classList.add('card-text')
    texto.innerHTML = `${obj.descricao}`
    cardBody.appendChild(texto)
    // adicionar um badge com a prioridade dentro do parágrafo
    if (obj.prioridade) {
        var prioridadeBadge = document.createElement('span')
        prioridadeBadge.classList.add('badge')
        prioridadeBadge.classList.add(obj.prioridade)
        prioridadeBadge.innerHTML = `Prioridade: ${obj.prioridade}`
        cardBody.appendChild(prioridadeBadge)
    }
    // configurações da categoria do card
    if (obj.categoria != null) {
        var categoria = document.createElement('div')
        categoria.style.backgroundColor = obj.cor
        categoria.classList.add('titulo-card')
        categoria.innerHTML = `Categoria: ${obj.categoria}`
        cardBody.appendChild(categoria)
    }

    divCard.appendChild(card)
}

function apagarCard(id_card) {
    let card = document.getElementById(id_card)
    card.remove()
    localStorage.removeItem(`task_${id_card}`)
    // decrementar o contador de id em uma unidade
    var id = parseInt(localStorage.getItem('id'))
    localStorage.setItem('id', `${id-1}`)
    // ajustar as chaves de localStorage
    for (let index = parseInt(id_card+1); index <= id-1; index++) {
        let obj = localStorage.getItem(`task_${index}`)
        localStorage.removeItem(`task_${index}`)
        localStorage.setItem(`task_${index-1}`, `${obj}`)
    }
}

function diferencaDatas() {
    let dataAtual = new Date()
    let datas = []
    for (let index = 0; index < parseInt(localStorage.getItem('id')); index++) {
        let obj = localStorage.getItem(`task_${index}`)
        obj = JSON.parse(obj).data
        let dataVencimento = new Date(`${obj} `)
        var diferencaDatas = Math.ceil((dataVencimento-dataAtual)/86400000)
        datas.push(diferencaDatas)
    }
    return datas
}

function indicesAlert(array) {
    let indices = []

    for (let i = 0; i < array.length; i++) {
        if (array[i] == 1) {
            indices.push(i)
        }
    }
    return indices
}

function gerarAlertaData() {
    let indicesData = indicesAlert(diferencaDatas())
    let divAlertas = document.getElementById('divAlertas')

    indicesData.forEach(function (d) {
        let obj = localStorage.getItem(`task_${d}`)
        obj = JSON.parse(obj)
        let alerta = document.createElement('div')
        alerta.classList.add('alert')
        alerta.innerHTML = `Sua tarefa "${obj.titulo}" vence amanhã!`
        alerta.style.backgroundColor = obj.cor
        alerta.style.textAlign = 'center'
        divAlertas.appendChild(alerta)
    })
}

gerarAlertaData()