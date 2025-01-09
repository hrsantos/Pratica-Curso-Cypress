/// <reference types="cypress" />

//método para definir uma suite de testes 
describe('Tarefas', () => {

    let testData

    //hooks before - executado apenas uma vez antes de iniciar os testes
    before(() => {
        //método para atribuir a massa de testes do arquivo tasksData para a variável testData 
        cy.fixture('tasksData').then(t => {
            testData = t
        })
    })

    //organização dos testes por contexto
    context('Cadastro', () => {

        // método para definir um caso de teste
        it('Deve cadastrar uma nova tarefa', () => {

            const nomeTarefa = testData.nova.name

            //exclui uma tarefa de mesmo nome caso ela já exista
            cy.excluirTarefa(nomeTarefa)

            //cria nova tarefa
            cy.criarTarefa(nomeTarefa)

            /*verifica via mapeamendo de css selector se o elemento contém o texto esperado
            e verifica se o texto está visível*/
            cy.contains('main div p', nomeTarefa)
                .should('be.visible')
        })

        it('Não deve permitir o cadastro de duas tarefas iguais', () => {

            //criação de objeto de valor constante
            const tarefa = testData.dup

            /*CRIAÇÃO DA MASSA VIA API DE FORMA A MANTER A INDEPENDÊNCIA ENTRE OS CENÁRIOS DE TESTES
            necessita de correção no servidor*/
            //cy.criarTarefaAPI(tarefa)

            //criação da 1ª Tarefa
            cy.criarTarefa(tarefa.name)

            //criação da 2ª Tarefa
            cy.criarTarefa(tarefa.name)

            //verifica se existe uma tarefa igual já cadastrada
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })

        it('Campo Add new task deve ser obrigatório', () => {

            cy.criarTarefa()
            cy.ValidaPreechimentoObrigatorio('This is a required field')
        })
    })
    context('Atualização', () => {

        it('Deve concluir uma tarefa', () => {

            const taskName = testData.conc.name

            //Criação da massa
            cy.excluirTarefa(taskName)
            cy.criarTarefa(taskName)

            //Step concluir tarefa
            cy.contains('p', taskName)
                .parent()
                .find('button[class*=ItemToggle]').click()

            //validação via propriedade CSS se o texto concluído está tracejado
            cy.contains('p', taskName)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })
    context('Exclusão', () => {

        it('Deve excluir uma tarefa', () => {

            const taskName = testData.exc.name

            //Criação da massa
            cy.excluirTarefa(taskName)
            cy.criarTarefa(taskName)

            //Step concluir tarefa
            cy.contains('p', taskName)
                .parent()
                .find('button[class*=ItemDelete]')
                .should('be.visible')
                .click()

            /*validação de exclusão da tarefa verificando se o elemento já não é mais 
            apresentado na tela*/
            cy.contains('p', taskName)
                .should('not.exist')
        })
    })
})