import { render, screen, fireEvent } from "@testing-library/react";
import assert from "node:assert";
import TodoList, { LOCAL_STORAGE_KEY } from "../TodoList";

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

  test("全削除ボタンをクリックしてOKすると、すべてのタスクが削除される", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("タスクを入力");
    const addButton = screen.getByText("追加");

    // タスクを3つ追加
    fireEvent.change(input, { target: { value: "タスク1" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "タスク2" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "タスク3" } });
    fireEvent.click(addButton);

    // 全削除ボタンをクリック
    const deleteAllButton = screen.getByText("全削除");
    jest.spyOn(window, "confirm").mockImplementation(() => true);
    fireEvent.click(deleteAllButton);

    // すべてのタスクが削除されていることを確認
    expect(screen.queryByText("タスク1")).not.toBeInTheDocument();
    expect(screen.queryByText("タスク2")).not.toBeInTheDocument();
    expect(screen.queryByText("タスク3")).not.toBeInTheDocument();
  });

  test("全削除ボタンをクリックしてキャンセルすると、タスクは削除されない", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("タスクを入力");
    const addButton = screen.getByText("追加");

    // タスクを3つ追加
    fireEvent.change(input, { target: { value: "タスク1" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "タスク2" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "タスク3" } });
    fireEvent.click(addButton);

    // 全削除ボタンをクリック（キャンセルを選択）
    const deleteAllButton = screen.getByText("全削除");
    jest.spyOn(window, "confirm").mockImplementation(() => false);
    fireEvent.click(deleteAllButton);

    // タスクが削除されない��とを確認
    expect(screen.getByText("タスク1")).toBeInTheDocument();
    expect(screen.getByText("タスク2")).toBeInTheDocument();
    expect(screen.getByText("タスク3")).toBeInTheDocument();
  });

  test("タスクがない場合、全削除ボタンが無効化されている", () => {
    render(<TodoList />);
    const deleteAllButton = screen.getByText("全削除");
    expect(deleteAllButton).toBeDisabled();
  });
  
  test("タスクがない場合、全削除ボタンをクリックしても確認ダイアログが表示されない", () => {
    render(<TodoList />);
    const deleteAllButton = screen.getByText("全削除");
  
    const confirmMock = jest.spyOn(window, "confirm");
    fireEvent.click(deleteAllButton);
    expect(confirmMock).not.toHaveBeenCalled();
  });
  
  test("アプリ起動時に localStorage からタスクを読み込む", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(["保存されたタスク"]));
    render(<TodoList />);
    expect(screen.getByText("保存されたタスク")).toBeInTheDocument();
  });

  test("タスクを追加すると localStorage に保存される", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("タスクを入力");
    const addButton = screen.getByText("追加");

    fireEvent.change(input, { target: { value: "新しいタスク" } });
    fireEvent.click(addButton);

    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    assert(storedData !== null);
    expect(JSON.parse(storedData)).toEqual(["新しいタスク"]);
  });

  test("タスクを削除すると localStorage からも削除される", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(["タスクA", "タスクB"]));

    render(<TodoList />);
    const deleteButton = screen.getByTestId("delete-0");
    fireEvent.click(deleteButton);

    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    assert(storedData !== null);
    expect(JSON.parse(storedData)).toEqual(["タスクB"]);
  });

  test("全削除を実行すると localStorage も空になる", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(["タスク1", "タスク2"]));

    render(<TodoList />);
    const deleteAllButton = screen.getByText("全削除");

    jest.spyOn(window, "confirm").mockImplementation(() => true);
    fireEvent.click(deleteAllButton);

    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    assert(storedData !== null);
    expect(JSON.parse(storedData)).toEqual([]);
  });

});
