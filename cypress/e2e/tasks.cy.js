/// <reference types="cypress" />

//método para definir uma suite de testes 
describe('Tarefas', () => {

    // método para definir um caso de teste
    it('Deve cadastrar uma nova tarefa', () => {

        const nomeTarefa ='Ler um livro de node JS'

        //exclui uma tarefa de mesmo nome caso ela já exista
        cy.excluirTarefa(nomeTarefa)

        //cria nova tarefa
        cy.criarTarefa(nomeTarefa)

        /*verifica via mapeamendo de css selector se o elemento contém o texto esperado
        e verifica se o texto está visível*/ 
        cy.contains('main div p', nomeTarefa)
            .should('be.visible')
    })

    it.only('Não deve permitir o cadastro de duas tarefas iguais', () => {
       
        //criação de objeto de valor constante
        const tarefa = {
            name: 'Estudar JS',
            is_done: false
        }

        /*CRIAÇÃO DA MASSA VIA API DE FORMA A MANTER A INDEPENDÊNCIA ENTRE OS CENÁRIOS DE TESTES
        necessita de correção no servidor*/
        //cy.criarTarefaAPI(tarefa)

        //criação da 1ª Tarefa
        cy.criarTarefa(tarefa.name)

        //criação da 2ª Tarefa
        cy.criarTarefa(tarefa.name)

        // verifica se existe uma tarefa igual já cadastrada
        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', 'Task already exists!')
    })

    Cypress.Commands.add('criarTarefa', (nomeTarefa)=> {
        //STEP acessa a url da aplicação com a qual a automação irá interagir
        cy.visit('http://localhost:3000');

        //STEP busca o elemento do tipo input e preenche com um valor
        cy.get('input[placeholder="Add a new Task"]').type(nomeTarefa)

        //STEP busca o elemento botão CREATE e clica nele
        cy.contains('button', 'Create').click()
    })

    Cypress.Commands.add('excluirTarefa', (nomeTarefa)=> {

        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: nomeTarefa }
        }).then(response => {
            expect(response.status).to.eq(204)
        })
    })

    /*Cypress.Commands.add('criarTarefaAPI', (tarefa)=> {
        cy.request({
            url: 'http://localhost:3333/tasks',
            method: 'POST',
            body: { name: tarefa.name, is_done: tarefa.is_done}
        }).then(response => {
            expect(response.status).to.eq(201)
        })
    })*/
})