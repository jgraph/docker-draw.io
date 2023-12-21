describe('test', () => {
  it('look for a button', () => {
    cy.visit('http://drawio:8080')

    cy.contains('Create New Diagram')
  })
})
