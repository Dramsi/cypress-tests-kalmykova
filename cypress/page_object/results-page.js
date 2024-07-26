class ResultsPage {
    getSectionTitle() {
        return cy.get('h1');
    }
    getPageTitle() {
        return cy.title();
    }
    getValueRowByTitle(titile) {
        return cy.get('tr').contains('th', `${titile}`).siblings('td');
    }
}

export default ResultsPage;