import { render, screen, fireEvent } from "@testing-library/react";
import assert from "node:assert";
import Counter from "./Counter";

describe("Counter コンポーネントのテスト", () => {
    test("初期表示でカウントが正しく表示される", () => {
        render(<Counter title="Test Counter" />);
        expect(screen.getByText(/現在のカウント: 0/)).toBeInTheDocument();
    });

    test("+1 ボタンを押すとカウントが増える", () => {
        render(<Counter title="Test Counter" />);
        const button = screen.getByText("+1 する");
        fireEvent.click(button);
        expect(screen.getByText(/現在のカウント: 1/)).toBeInTheDocument();
    });

    test("-1 ボタンを押すとカウントが減る", () => {
        render(<Counter title="Test Counter" />);
        const plusButton = screen.getByText("+1 する");
        const minusButton = screen.getByText("-1 する");

        fireEvent.click(plusButton);
        fireEvent.click(plusButton);
        fireEvent.click(minusButton);

        expect(screen.getByText(/現在のカウント: 1/)).toBeInTheDocument();
    });

    test("チェックボックスの切り替えが localStorage に反映される", () => {
        render(<Counter title="Test Counter" />);
        const checkbox = screen.getByRole<HTMLInputElement>("checkbox");
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(true); // 一度クリックすると true になる

        const storedData = localStorage.getItem("counterData");
        assert(storedData !== null);
        expect(Object.keys(JSON.parse(storedData)))
            .toEqual(expect.arrayContaining(["count", "minCount", "maxCount"]));
    });

    test("チェックボックスをOFFにすると、localStorageから消える", () => {
        render(<Counter title="Test Counter" />);
        const checkbox = screen.getByRole<HTMLInputElement>("checkbox");
        fireEvent.click(checkbox);
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(false); // 二度クリックすると false に戻る

        expect(localStorage.getItem("counterData")).toBe(null);
    });
});
