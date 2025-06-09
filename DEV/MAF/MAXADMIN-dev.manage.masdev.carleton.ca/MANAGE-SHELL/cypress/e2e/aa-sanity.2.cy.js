const path = require("path");

let baseServerUrl = Cypress.env("SITE_URL") ?? "http://localhost:5000";

describe("Classic IFRame exists", () => {
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

  it("Check classic iframe", () => {
    cy.visit(`${baseServerUrl}?theme=default`);
    cy.get("#manage-shell_Iframe").should("exist");
    cy.get("iframe", { timeout: 30000 })
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
      .contains("Classic Maximo", { timeout: 30000 });
  });
});
