// import App from "./App";
// import Card from "./component/Card";
// import List from "./component/List";
// import Modal from "./component/Modal";

// const baseUrl = "https://todo-api-18-140-52-65.rakamin.com";

// describe("Get Token and and Get Todo list", () => {
//   beforeEach(() => {
//     cy.request("POST", `${baseUrl}/auth/login`, {
//       email: "Izza@Izza.com",
//       password: "passwordIzza",
//     })
//       .its("body")
//       .as("token");
//     cy.then(function () {
//       Cypress.env("token", this.token.auth_token);
//     });
//   });

//   it("Should get Todo list from api", function () {
//     const token = Cypress.env("token");
//     cy.request({
//       method: "GET",
//       url: `${baseUrl}/todos`,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .its("body")
//       .as("todo");

//     cy.then(function () {
//       const idList = [];
//       this.todo.map((item) => idList.push(item));
//       Cypress.env("idList", idList);
//     });
//   });
// });

// describe("Adding Task", () => {
//   it(`Adding items in notes with `, () => {
//     const list = Cypress.env("idList");
//     const token = Cypress.env("token");
//     cy.log(`detected ${list.length} board `);

//     // board map loop
//     list.forEach((item, idx) => {
//       // interceptor check submit resp
//       if (idx > 0) return;
//       cy.intercept({
//         url: `${baseUrl}/todos/${item.id}/items`,
//       }).as("checkSubmitRes");

//       // mounting component
//       cy.mount(
//         <Modal type="create" title="Create Task" detail={item} bearer={token} />
//       );
//       cy.get("input[name=name]").type(`Add f/ Cypress, board id ${item.id}`);
//       cy.get("input[name=progress_percentage]").type(90);
//       cy.get("button.button-primary").click();
//       cy.wait("@checkSubmitRes").its("response.statusCode").should("eql", 201);
//     });
//   });
// });

// describe("Edit Task Random", () => {
//   it("Get one random list from todo", () => {
//     const list = Cypress.env("idList");
//     const token = Cypress.env("token");

//     list.map((itm, idx) => {
//       cy.request({
//         method: "GET",
//         url: `${baseUrl}/todos/${itm.id}/items`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .its("body")
//         .should("have.length.above", 0)
//         .as("listTodo");
//       cy.then(function () {
//         const arr = Cypress.env("List");
//         if (arr)
//           return Cypress.env("List", [
//             ...this.listTodo,
//             ...Cypress.env("List"),
//           ]);

//         Cypress.env("List", [...this.listTodo]);
//       });
//     });
//   });

//   it("Edit all of tasks", () => {
//     const item = Cypress.env("List");
//     const token = Cypress.env("token");
//     cy.log(`${item.length} items detected`);

//     item.map((item, index) => {
//       const { todo_id, id } = item;
//       cy.intercept({
//         url: `${baseUrl}/todos/${todo_id}/items/${id}`,
//       }).as("editResp");

//       cy.mount(
//         <Modal type="edit" title="Edit Task" detail={item} bearer={token} />
//       );
//       cy.get("input[name=name]").type(
//         `{selectall}{backspace} edit f/ Cypress, board id ${id}`
//       );
//       cy.get("input[name=progress_percentage]").type(
//         "{backspace}{backspace}{backspace}60"
//       );
//       cy.get("button.button-primary").click();
//       cy.wait("@editResp").its("response.statusCode").should("eql", 200);
//     });
//   });
// });
