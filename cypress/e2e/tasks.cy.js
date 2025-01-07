/// <reference types="cypress" />

//método para definir uma suite de testes 
describe('Tarefas', () => {

    // método para definir um caso de teste
    it('Deve cadastrar uma nova tarefa', () => {

        const taskName ='Ler um livro de node JS'
        //PREPARAR A MASSA DE TESTE: verifica via api se existe uma tarefa registrada
        // e remove a tarefa se existir

        //método cy.request que permite acessar e manipular dados diretamente em uma API
        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: taskName }
        }).then(response => {
            expect(response.status).to.eq(204)
        })

        //STEP acessa a url da aplicação com a qual a automação irá interagir
        cy.visit('http://localhost:3000')

        //STEP busca o elemento do tipo input e preenche com um valor
        cy.get('input[placeholder="Add a new Task"]').type(taskName)

        //STEP busca o elemento botão CREATE e clica nele (XPATH button[text() = 'Create '])
        cy.contains('button', 'Create').click()

        //STEP verifica via mapeamendo de css selector se o elemento contém o texto esperado
        // e verifica se o texto está visível 
        cy.contains('main div p', taskName)
            .should('be.visible')
    })

    it('Não deve permitir o cadastro de duas tarefas iguais', () => {
       
        const task = {
            name: 'Estudar JS',
            is_done: false
        }

        /*CRIAÇÃO DA MASSA VIA API DE FORMA A MANTER A INDEPENDÊNCIA ENTRE OS CENÁRIOS DE TESTES
        necessita de correção no servidor
        cy.request({
            url: 'http://localhost:3333/tasks',
            method: 'POST',
            body: { name: 'Estudar JS', is_done: false}
        }).then(response => {
            expect(response.status).to.eq(201)
        })*/

        //STEP Criação da 1ª Tarefa
        cy.visit('http://localhost:3000');

        cy.get('input[placeholder="Add a new Task"]').type(task.name)

        cy.contains('button', 'Create').click()

        //STEP Criação da 2ª Tarefa
        cy.visit('http://localhost:3000');

        cy.get('input[placeholder="Add a new Task"]').type(task.name)

        cy.contains('button', 'Create').click()

        //STEP verifica se existe uma tarefa igual já cadastrada
        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', 'Task already exists!')
    })
})