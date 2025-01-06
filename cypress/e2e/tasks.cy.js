/// <reference types="cypress" />

//método para definir uma suite de testes 
describe('Tarefas', ()=> {

    // método para definir um caso de teste
    it('Deve cadastrar uma nova tarefa', ()=> {

        //PREPARAR A MASSA DE TESTE: verifica via api se existe uma tarefa registrada
        // e remove a tarefa se existir

        //método cy.request que permite acessar e manipular dados diretamente em uma API
        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: {name: 'Ler um livro de node JS'}
        }).then(response => {
            expect(response.status).to.eq(204)
        })

        //STEP acessa a url da aplicação com a qual a automação irá interagir
        cy.visit('http://localhost:3000')

        //STEP busca o elemento do tipo input e preenche com um valor
        cy.get('input[placeholder="Add a new Task"]').type('Ler um livro de node JS')

        //STEP busca o elemento botão CREATE e clica nele (XPATH button[text() = 'Create '])
        cy.contains('button','Create').click()

        //ASSERTION verifica via mapeamendo de css selector se o elemento contém o texto esperado
        // e verifica se o texto está visível 
        cy.contains('main div p', 'Ler um livro de node JS')
            .should('be.visible')
    })
})