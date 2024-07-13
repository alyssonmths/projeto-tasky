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

    // verificar se os campos não estão vazios e exibir modal interativo
    
    if (titulo != '' && descricao != '') { // sucesso
        gravar(tarefa)
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
        let modal = new bootstrap.Modal(document.getElementById('modal'))
        document.getElementById('titulo-modal').innerHTML = 'Erro'
        document.getElementById('conteudo-modal').innerHTML = 'A tarefa não foi adicionada pois existem campos obrigatórios vazios. Corrija-os e tente novamente.'
        document.getElementById('botao-modal').innerHTML = 'Fechar e corrigir'
        modal.show()
    }
}

