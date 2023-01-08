import List from "../component/List";
import Modal from "../component/Modal";

const baseUrl = "https://todo-api-18-140-52-65.rakamin.com";

describe("Get Token and Get Board list", () => {
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

  it("Should get Board list from api", function () {
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
      const boardList = [];
      this.todo.map((item) => boardList.push(item));
      Cypress.env("boardList", boardList);
    });
  });
});

describe("Adding Task Each Board", () => {
  it(`Add Task list `, () => {
    const list = Cypress.env("boardList");
    const token = Cypress.env("token");
    cy.log(`detected ${list.length} board `);
    // board map loop
    list.forEach((item, idx) => {
      // interceptor check submit resp
      cy.intercept({
        url: `${baseUrl}/todos/${item.id}/items`,
      }).as("checkSubmitRes");

      // mounting component
      cy.mount(
        <Modal type="create" title="Create Task" detail={item} bearer={token} />
      );
      cy.get("input[name=name]").type(`Add f/ Cypress, board id ${item.id}`);
      cy.get("input[name=progress_percentage]").type(90);
      cy.get("button.button-primary").click();
      cy.wait("@checkSubmitRes").its("response.statusCode").should("eql", 201);
    });
  });
});

describe("Edit Task ", () => {
  it("Getall list from todo", () => {
    const list = Cypress.env("boardList");
    const token = Cypress.env("token");

    list.map((itm, idx) => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/todos/${itm.id}/items`,
        headers: {
          Authorization: `Bearer ${token}`,
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

  it("Edit Tasks", () => {
    const item = Cypress.env("List");
    const token = Cypress.env("token");
    cy.log(`${item.length} items detected`);

    item.map((item, index) => {
      if (index > 0) return;
      const { todo_id, id } = item;
      cy.intercept({
        url: `${baseUrl}/todos/${todo_id}/items/${id}`,
      }).as("editResp");

      cy.mount(
        <Modal type="edit" title="Edit Task" detail={item} bearer={token} />
      );
      cy.get("input[name=name]").type(
        `{selectall}{backspace} edit f/ Cypress, board id ${id}`
      );
      cy.get("input[name=progress_percentage]").type(
        "{backspace}{backspace}{backspace}60"
      );
      cy.get("button.button-primary").click();
      cy.wait("@editResp").its("response.statusCode").should("eql", 200);
    });
  });
});

describe("Move Task via button", () => {
  it("Move List right", () => {
    const boardList = Cypress.env("boardList");
    const token = Cypress.env("token");
    const taskList = Cypress.env("List").filter(
      (e) => boardList[0].id === e.todo_id
    );
    const row = [];
    boardList.map((e) => row.push(e.id));
    const { todo_id, id, progress_percentage, name } = taskList[0];
    const currentRow = boardList[0].id;

    cy.intercept({
      url: `${baseUrl}/todos/${todo_id}/items/${id}`,
    }).as("moveResp");

    cy.mount(
      <List
        listTitle={name}
        row={row}
        progress={`${progress_percentage}%`}
        detail={taskList[0]}
        token={token}
        id={todo_id}
        bearer={token}
      />
    );
    cy.get("img.setting").click();
    cy.get("div[type=right]").click();
    cy.wait("@moveResp").then((res) => {
      const { statusCode } = res.response;
      const { todo_id } = res.response.body;
      cy.wrap(todo_id).should("eql", currentRow + 1);
      cy.wrap(statusCode).should("eql", 200);
    });
  });

  it("Move List left", () => {
    const boardList = Cypress.env("boardList");
    const token = Cypress.env("token");
    const taskList = Cypress.env("List").filter(
      (e) => boardList[1].id === e.todo_id
    );
    const row = [];
    boardList.map((e) => row.push(e.id));
    const { todo_id, id, progress_percentage, name } = taskList[1];
    const currentRow = boardList[1].id;
    cy.intercept({
      url: `${baseUrl}/todos/${todo_id}/items/${id}`,
    }).as("moveResp");

    cy.mount(
      <List
        listTitle={name}
        row={row}
        progress={`${progress_percentage}%`}
        detail={taskList[1]}
        token={token}
        id={todo_id}
        bearer={token}
      />
    );

    cy.get("img.setting").click();
    cy.get("div[type=left]").click();
    cy.wait("@moveResp").then((res) => {
      const { statusCode } = res.response;
      const { todo_id } = res.response.body;
      cy.wrap(todo_id).should("eql", currentRow - 1);
      cy.wrap(statusCode).should("eql", 200);
    });
  });
});

describe("Delete Task", () => {
  it("should delete task", () => {
    const firstList = Cypress.env("List")[0];
    const token = Cypress.env("token");
    const { todo_id, id } = firstList;
    cy.intercept({
      url: `${baseUrl}/todos/${todo_id}/items/${id}`,
    }).as("deleteResp");

    cy.mount(
      <Modal
        type="delete"
        title="Delete Task"
        detail={firstList}
        bearer={token}
      />
    );
    cy.get("button.button-danger").click();
    cy.wait("@deleteResp").its("response.statusCode").should("eql", 204);
  });
});
