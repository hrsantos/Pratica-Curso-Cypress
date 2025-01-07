// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//criação de alias para o campo inputtext
//cy.get('input[placeholder="Add a new Task"]').as(inputText)

Cypress.Commands.add('criarTarefa', (nomeTarefa = '') => {
    //STEP acessa a url da aplicação com a qual a automação irá interagir
    cy.visit('http://localhost:3000');

    //cria alias para o campo input text
    cy.get('input[placeholder="Add a new Task"]').as('inputText')

    if (nomeTarefa !== '') {

        //STEP busca o elemento do tipo input e preenche com um valor
        cy.get('@inputText').type(nomeTarefa)
    }
    //STEP busca o elemento botão CREATE e clica nele
    cy.contains('button', 'Create').click()
})

Cypress.Commands.add('excluirTarefa', (nomeTarefa) => {

    cy.request({
        url: 'http://localhost:3333/helper/tasks',
        method: 'DELETE',
        body: { name: nomeTarefa }
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})

Cypress.Commands.add('ValidaPreechimentoObrigatorio', (msgAlertA) => {

    /** Para a validação da apresentação da mensagem do alert é preciso utilizar 
     * o método invoke, pois o alert apresntado não é do tipo html e não pode ser acessado via
     * inspeção de elementos. pela propriedade validationMessage capturamos o texto do alert
     * e podemos comparar com a mensagem esperada.
     * **/

    cy.get('@inputText')
        .invoke('prop', 'validationMessage')
        .should((text) => {
            expect(
                msgAlertA
            ).to.eq(text)
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
