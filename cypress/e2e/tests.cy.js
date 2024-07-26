import YourAverageFormPage from '../page_object/your-average-form-page';
import ResultsPage from '../page_object/results-page';

describe('Verify fields', () => {
  const averageFormPage = new YourAverageFormPage();
  beforeEach(() => {
    averageFormPage.goMainPage();
  });
  it('Verify that fields is visible and required', () => {
    averageFormPage.getUsernameField().should('be.visible').and('have.attr', 'required');
    averageFormPage.getPasswordField().should('be.visible').and('have.attr', 'required');
  });
  it('Verify Username field', () => {
    averageFormPage.getUsernameField().type('Name123').should('have.value', 'Name123');
  });
  it('Verify Password field', () => {
    averageFormPage.getPasswordField().type('password123').should('have.value', 'password123');
  });
});

describe('Verify Gender block', () => {
  const averageFormPage = new YourAverageFormPage();
  beforeEach(() => {
    averageFormPage.goMainPage();
  });
  it('Verify that not checked radio buttons', () => {
    averageFormPage.getGenderRadioButton('Male').should('be.visible').and('not.be.checked');
    averageFormPage.getGenderRadioButton('Female').should('be.visible').and('not.be.checked');
  });
  it('Check Male radio button', () => {
    averageFormPage.getGenderRadioButton('Male').check().should('be.checked');
    averageFormPage.getGenderRadioButton('Female').should('not.be.checked');
  });
  it('Check Female radio button', () => {
    averageFormPage.getGenderRadioButton('Female').check().should('be.checked');
    averageFormPage.getGenderRadioButton('Male').should('not.be.checked');
  });
});

describe('Verify Hobbies block', () => {
  const averageFormPage = new YourAverageFormPage();
  beforeEach(() => {
    averageFormPage.goMainPage();
  });
  it('Verify Hobbies checkboxes separately from each other', () => {
    const hobbies = ['Reading', 'Sports', 'Music'];
    hobbies.forEach(hobby => {
      averageFormPage.getHobbyCheckbox(hobby).should('be.visible').and('not.be.checked');
      averageFormPage.getHobbyCheckbox(hobby).check().should('be.checked');
      averageFormPage.getHobbyCheckbox(hobby).uncheck().should('not.be.checked');
    });
  });
  it('Verify Hobbies checkboxes together', () => {
    const hobbies = ['Reading', 'Sports', 'Music'];
    hobbies.forEach(hobby => {
      averageFormPage.getHobbyCheckbox(hobby).check();
    });
    hobbies.forEach(hobby => {
      averageFormPage.getHobbyCheckbox(hobby).should('be.checked');
    });
  });
});

describe('Verify Time block', () => {
  const averageFormPage = new YourAverageFormPage();
  beforeEach(() => {
    averageFormPage.goMainPage();
  });
  it('Verify that dropdown is visible and required', () => {
    averageFormPage.getTimeDropdown().should('be.visible').and('have.attr', 'required');
  });
  it('Verify that items are selectable', () => {
    averageFormPage.selectTime('Morning');
    averageFormPage.getTimeDropdown().should('have.value', 'Morning');
    averageFormPage.selectTime('Noon');
    averageFormPage.getTimeDropdown().should('have.value', 'Noon');
    averageFormPage.selectTime('Evening');
    averageFormPage.getTimeDropdown().should('have.value', 'Evening');
  });
});

describe('Verify Results block', () => {
  const averageFormPage = new YourAverageFormPage();
  const resultsPage = new ResultsPage();
  beforeEach(() => {
    averageFormPage.goMainPage();
  });
  it('Verify that Submit button is visible and enabled', () => {
    averageFormPage.getSubmitButton().should('be.visible').and('not.be.disabled');
  });
  it('Verify results', () => {
    averageFormPage.getUsernameField().type('Name123');
    averageFormPage.getPasswordField().type('password123');
    averageFormPage.getGenderRadioButton('Female').check()
    averageFormPage.getHobbyCheckbox('Reading').check();
    averageFormPage.selectTime('Evening');
    averageFormPage.getSubmitButton().click();
    resultsPage.getPageTitle().should('contain', 'Results');
    resultsPage.getSectionTitle().should('contain', 'Greetings, Name123');
    resultsPage.getValueRowByTitle('Gender').should('contain', 'Female');
    resultsPage.getValueRowByTitle('Hobbies').should('contain', 'Reading');
    resultsPage.getValueRowByTitle('Time').should('contain', 'Evening');
  });
});