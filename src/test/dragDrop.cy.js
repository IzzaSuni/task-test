import App from "../App";
import "@4tw/cypress-drag-drop";

describe("Drag and Drop", () => {
  const baseUrl = "https://todo-api-18-140-52-65.rakamin.com";

  it("should get token", () => {
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

  it("should get board list", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/todos`,
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
    })
      .its("body")
      .as("todo");

    cy.then(function () {
      const boardList = [];
      this.todo.map((item) => boardList.push(item));
      Cypress.env("boardList", boardList);
    });
  });

  it("should get list inside board", () => {
    Cypress.env("boardList").map((itm, idx) => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/todos/${itm.id}/items`,
        headers: {
          Authorization: `Bearer ${Cypress.env("token")}`,
        },
      })
        .its("body")
        .as("listTodo");
      cy.then(function () {
        const arr = Cypress.env("List");
        if (arr)
          return Cypress.env("List", [
            ...this.listTodo,
            ...Cypress.env("List"),
          ]);

        Cypress.env("List", [...this.listTodo]);
      });
    });
  });

  it("Should move drag n drop list", () => {
    const boardList = Cypress.env("boardList");
    const List = Cypress.env("List");
    const listBoard1 = List.filter((e) => e.todo_id === boardList[0].id);
    const listBoard2 = List.filter((e) => e.todo_id === boardList[1].id);
    cy.log(listBoard1, listBoard2);
    cy.intercept({
      url: `${baseUrl}/todos/${listBoard1[0].todo_id}/items/${listBoard1[0].id}`,
    }).as("moveResp");
    cy.mount(<App />);

    cy.get(`div#${listBoard1[0].id}`).drag(`div#${listBoard2[0].id}`);
    cy.wait("@moveResp").its("response.statusCode").should("eql", 200);
  });
});
