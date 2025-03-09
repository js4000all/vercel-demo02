import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../TodoList";

describe("TodoList コンポーネントのテスト", () => {
  test("入力フィールドと追加ボタンが表示される", () => {
    render(<TodoList />);
    expect(screen.getByPlaceholderText("タスクを入力")).toBeInTheDocument();
    expect(screen.getByText("追加")).toBeInTheDocument();
  });

  test("タスクを追加できる", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("タスクを入力");
    const addButton = screen.getByText("追加");

    fireEvent.change(input, { target: { value: "新しいタスク" } });
    fireEvent.click(addButton);

    expect(screen.getByText("新しいタスク")).toBeInTheDocument();
  });
  test("タスクを2つ追加すると、リストの要素数が2になる", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("タスクを入力");
    const addButton = screen.getByText("追加");

    fireEvent.change(input, { target: { value: "タスク1" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "タスク2" } });
    fireEvent.click(addButton);

    expect(screen.getAllByRole("listitem").length).toBe(2); // 2つのタスクが追加されていることを確認
  });
  test("タスクを削除できる", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("タスクを入力");
    const addButton = screen.getByText("追加");

    fireEvent.change(input, { target: { value: "削除するタスク" } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText("削除");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("削除するタスク")).not.toBeInTheDocument();
  });

  test("特定のタスクを削除できる", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("タスクを入力");
    const addButton = screen.getByText("追加");

    // タスクを3つ追加
    fireEvent.change(input, { target: { value: "タスクA" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "タスクB" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "タスクC" } });
    fireEvent.click(addButton);

    // 「タスクB」の削除ボタン（index=1）を特定
    const deleteButton = screen.getByTestId("delete-1");
    fireEvent.click(deleteButton);

    // 「タスクB」だけが削除され、他のタスクが残っていることを確認
    expect(screen.queryByText("タスクB")).not.toBeInTheDocument();
    expect(screen.getByText("タスクA")).toBeInTheDocument();
    expect(screen.getByText("タスクC")).toBeInTheDocument();
  });  
});
