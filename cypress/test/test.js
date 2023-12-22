describe('test', () => {
  it('look for a button', () => {
    cy.visit('http://localhost:8080')

    cy.contains('Create New Diagram')
  })
})
