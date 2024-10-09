import React from "react";
import TabsItem from "./TabsItem";
import PropTypes from "prop-types";

function TodoList({ todos, onDelete, onEdit, onTodoFinished, keywordSearch }) {
  let todosNotFinished = todos.filter((todo) => !todo.is_finished);
  let todosFinished = todos.filter((todo) => todo.is_finished);

  if (keywordSearch) {
    todosNotFinished = todosNotFinished.filter(function (todo) {
      return todo.title.toLowerCase().includes(keywordSearch.toLowerCase());
    });

    todosFinished = todosFinished.filter(function (todo) {
      return todo.title.toLowerCase().includes(keywordSearch.toLowerCase());
    });
  }

  todosNotFinished.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA;
  });

  todosFinished.sort((a, b) => {
    const dateA = new Date(a.updated_at);
    const dateB = new Date(b.updated_at);
    return dateB - dateA;
  });

  // eslint-disable-next-line quotes
  const titleTodoFinished = `Todo Telah Selesai (${todosFinished.length})`;
  const titleTodoNotFinished = `Todo Belum Selesai (${todosNotFinished.length})`;

  return (
    <div className="col-lg-12 col-md-12">
      <div className="mt-4 mb-5">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#not-finished"
              type="button"
              role="tab"
              aria-controls="not-finished"
              aria-selected="true"
            >
              Belum Selesai
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#finished"
              type="button"
              role="tab"
              aria-controls="finished"
              aria-selected="false"
            >
              Telah Selesai
            </button>
          </li>
        </ul>

        <div className="tab-content" id="myTabContent">
          <TabsItem
            tabId={"not-finished"}
            title={titleTodoNotFinished}
            isActive={true}
            todos={todosNotFinished}
            onDelete={onDelete}
            onEdit={onEdit}
            onTodoFinished={onTodoFinished}
          ></TabsItem>

          <TabsItem
            tabId={"finished"}
            title={titleTodoFinished}
            isActive={false}
            todos={todosFinished}
            onDelete={onDelete}
            onEdit={onEdit}
            onTodoFinished={onTodoFinished}
          ></TabsItem>
        </div>
      </div>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onTodoFinished: PropTypes.func.isRequired,
  keywordSearch: PropTypes.string.isRequired,
};

export default TodoList;
