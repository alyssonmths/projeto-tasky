class Task {
    constructor(titulo, descricao, imagem) {
        this.titulo = titulo
        this.descricao = descricao
        this.imagem = imagem
    }
}

function gravar(tarefa) {
    // recupera o id gravado em LocalStorage e o atualiza depois da inserção da tarefa.
    let id = parseInt(localStorage.getItem('id'))
    localStorage.setItem(`task_${id}`, JSON.stringify(tarefa))
    id += 1
    localStorage.setItem('id', `${id}`)
}

function capturarDados() {
    let titulo = document.getElementById('titulo').value
    let descricao = document.getElementById('descricao').value

    if (document.getElementById('imagem').value != '') {
        var imagem = document.getElementById('imagem').value
    }
    
    // criando um objeto a partir da classe Task, usando as variáveis declaradas acima

    let tarefa = new Task(titulo, descricao, imagem)

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