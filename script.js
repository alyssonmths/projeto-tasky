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
    localStorage.setItem(`${id}`, JSON.stringify(tarefa))
    id += 1
    localStorage.setItem('id', `${id}`)
}

function capturarDados() {
    let titulo = document.getElementById('titulo').value
    let descricao = document.getElementById('descricao').value
    let imagem = document.getElementById('imagem').value
    
    // criando um objeto a partir da classe Task, usando as variáveis declaradas acima

    let tarefa = new Task(titulo, descricao, imagem)
    
    gravar(tarefa)
}

