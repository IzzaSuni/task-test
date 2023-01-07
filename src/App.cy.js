import App from "./App";
import Card from "./component/Card";
import List from "./component/List";
import Modal from "./component/Modal";

const baseUrl = "https://todo-api-18-140-52-65.rakamin.com";

describe("Get Token and and Get Todo list", () => {
  beforeEach(() => {
    cy.request("POST", `${baseUrl}/auth/login`, {
      email: "Izza@Izza.com",
      password: "passwordIzza",
    })
      .its("body")
      .as("token");
    cy.then(function () {
      Cypress.env("token", this.token.auth_token);
    });
  });

  it("Should get Todo list from api", function () {
    const token = Cypress.env("token");
    cy.request({
      method: "GET",
      url: `${baseUrl}/todos`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .its("body")
      .as("todo");

    cy.then(function () {
      const idList = [];
      this.todo.map((item) => idList.push(item));
      Cypress.env("idList", idList);
    });
  });
});

describe("Adding Task", () => {
  it(`Adding items in notes with `, () => {
    const list = Cypress.env("idList");
    const token = Cypress.env("token");
    cy.log(`detected ${list.length} board `);

    // board map loop
    list.forEach((item, idx) => {
      // interceptor check submit resp
      cy.intercept({
        method: "POST",
        url: `${baseUrl}/todos/${item.id}/items`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).as("checkSubmitRes");

      // mounting component
      cy.mount(
        <Modal type="create" title="Create Task" detail={item} bearer={token} />
      );
      cy.get("input[name=name]").type(`Add f/ Cypress, board id ${item.id}`);
      cy.get("input[name=progress_percentage]").type(90);
      //   cy.get("button.button-primary").click();
      cy.wait("@checkSubmitRes")
        .its("response.body")
        .should("have.own.property", "id");
    });
  });
});

// describe("Edit Task Random", () => {
//   it(`Adding items in notes with `, () => {
//     const list = Cypress.env("idList");
//     const token = Cypress.env("token");
//     cy.log(`detected ${list.length} board `);
//     list.forEach((item, idx) => {
//       cy.mount(
//         <Modal type="create" title="Create Task" detail={item} bearer={token} />
//       );
//       cy.get("input[name=name]").type(`Add task from Cypress id ${item.id}`);
//       cy.get("input[name=progress_percentage]").type(90);
//     //   cy.get("button.button-primary").click();
//       cy.wait(1000);
//     });
//     // cy.mount(<Card type="create"  title="Create Task" />);
//   });
// });
