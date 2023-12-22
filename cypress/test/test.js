describe('test', () => {
  it('look for a button', () => {
    cy.visit('http://localhost:8080')

    cy.contains('Decide later').click()
    cy.contains('More Shapes').click()
  })
})
