describe('user interactions', () => {
  it('should render the page', () => {
    cy.visit('http://localhost:5173/')
    // CLICK FILTER BY REGION MENU
    cy.get("button").contains("Filter").click()
    // SELECT THE EUROPE REGION 
    cy.get("button").contains("Europe").click()
    // TYPE "GER" IN THE SEARCH INPUT
    cy.get("[data-id= 'search-input']").type("GER")
    // REMOVE "GER" FROM THE INPUT
    cy.get("[data-id= 'search-input']").clear()
    // CLICK THE THIRD ELEMENT
    cy.get('[data-id = "country-card"]').eq(2).click()
    // CLICK ONE OF THE BORDER COUNTRIES
    cy.get("button").contains("ROU").click()
    // GO BACK TO MAIN PAGE
    cy.get("a").contains("Back").click()
  })
})
