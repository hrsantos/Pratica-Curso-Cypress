describe('home', () => {
  it('web appdeve estar online', () => {
    cy.visit('http://localhost:3000')
    //sgould = assertEquals Selenium
    //Verifica se o título da página está correto
    cy.title().should('eq', 'Gerencie suas tarefas com Mark L')
  })
})