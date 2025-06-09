const path = require("path");

let baseServerUrl = Cypress.env("SITE_URL") ?? "http://localhost:5000";

function dismissDesktopErrorMessages() {
  cy.get("body").then((body) => {
    if (body.find('[title="Close"]').length) {
      cy.contains("System message").should("be.visible");
      cy.get('[title="Close"]')
        .click({ force: true })
        .then(() => {
          cy.log("Dismissing Dialog");
          dismissDesktopErrorMessages(); // Call recursively until no more close buttons are found
        });
    } else {
      cy.log("No more system errors");
    }
  });
}

function dismissMobileErrorMessages() {
  cy.get("body").then((body) => {
    if (body.find("#graphite_dialog_error_close_button").length) {
      cy.contains("System message").should("be.visible");
      cy.get("#graphite_dialog_error_close_button")
        .click({ force: true })
        .then(() => {
          cy.log("Dismissing Dialog");
          dismissDesktopErrorMessages(); // Call recursively until no more close buttons are found
        });
    } else {
      cy.log("No more system errors");
    }
  });
}

describe("Graphite sanity check", () => {
  beforeEach(() => {
    // Intercept all HTTP requests and add a custom header with the test name
    // This is enables the snapshot manages to place snapshots in a separate
    // folder based on the test file and the test name
    cy.intercept("*", (req) => {
      const testName = Cypress.mocha.getRunner().suite.ctx.test.title;
      req.headers["x-maf-test-name"] = testName;
      req.headers["x-maf-test-script"] = path.basename(__filename, ".js");
    }).as("apiRequest");
  });

  before(() => {
    // Wait for the server to start by checking if the homepage is up
    const checkServerIsUp = () => {
      console.log("Checking for server...");
      return cy
        .request({
          url: baseServerUrl,
          failOnStatusCode: false,
        })
        .then((response) => {
          if (response.status !== 200) {
            cy.wait(500);
            return checkServerIsUp();
          }
          return;
        });
    };

    checkServerIsUp();
  });

  it("Check desktop theme", () => {
    cy.visit(`${baseServerUrl}?theme=default`);
    cy.get("[data-testid='suite-header']").should("exist");
    // cy.contains("Maximo").should("be.visible");
    cy.wait(1000);
    dismissDesktopErrorMessages();
    cy.get("#app-switcher > .bx--header__menu-item").click();
    cy.get("#app-switcher > svg").click();
    cy.get("#suite-header-action-item-help > svg").click();
    cy.get("#defaultSysInfo").click();
    cy.contains("System information").should("be.visible");
    cy.get('[title="Close"]').click();
  });

  it("Check touch theme", () => {
    cy.visit(`${baseServerUrl}?theme=touch`);
    cy.get(".mx--company-name").should("exist");
    cy.wait(1000);
    dismissMobileErrorMessages();
    // cy.contains("Maximo").should("exist");
    cy.get("#ApplicationSwitcher").click();
    cy.get("#ApplicationSwitcher").click();
  });
});
