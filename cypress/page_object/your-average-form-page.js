class YourAverageFormPage {
    goMainPage() {
        cy.visit('/');
    }
    getUsernameField() {
        return cy.get('#username');
    }
    getPasswordField() {
        return cy.get('#password');
    }
    getGenderRadioButton(gender) {
        return cy.get(`input[name="gender"][value="${gender}"]`);
    }
    getHobbyCheckbox(hobby) {
        return cy.get(`input[name="hobby"][value="${hobby}"]`);
    }
    getTimeDropdown() {
        return cy.get('#time');
    }
    selectTime(option) {
        this.getTimeDropdown().select(option);
    }
    getSubmitButton(option) {
        return cy.get('button[type="submit"]');
    }
    getLoadingElement() {
        return cy.get('#loading');
    }
}

export default YourAverageFormPage;