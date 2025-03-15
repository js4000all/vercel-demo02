import { render, screen, fireEvent } from "@testing-library/react";
import assert from "node:assert";
import Counter, { STORAGE_KEY } from "./Counter";
import { MemoryStorage } from "@/storage";

describe("Counter コンポーネントのテスト", () => {
    test("初期表示でカウントが正しく表示される", () => {
        render(<Counter title="Test Counter" storage={new MemoryStorage()} />);
        expect(screen.getByText(/現在のカウント: 0/)).toBeInTheDocument();
    });

    test("+1 ボタンを押すとカウントが増える", () => {
        render(<Counter title="Test Counter" storage={new MemoryStorage()} />);
        const button = screen.getByText("+1 する");
        fireEvent.click(button);
        expect(screen.getByText(/現在のカウント: 1/)).toBeInTheDocument();
    });

    test("-1 ボタンを押すとカウントが減る", () => {
        render(<Counter title="Test Counter" storage={new MemoryStorage()} />);
        const plusButton = screen.getByText("+1 する");
        const minusButton = screen.getByText("-1 する");

        fireEvent.click(plusButton);
        fireEvent.click(plusButton);
        fireEvent.click(minusButton);

        expect(screen.getByText(/現在のカウント: 1/)).toBeInTheDocument();
    });

    test("チェックボックスの切り替えが localStorage に反映される", async () => {
        const storage = new MemoryStorage();
        render(<Counter title="Test Counter" storage={storage} />);
        const checkbox = screen.getByRole<HTMLInputElement>("checkbox");
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(true); // 一度クリックすると true になる

        const storedData = await storage.load(STORAGE_KEY);
        assert(storedData !== null);
        expect(Object.keys(JSON.parse(storedData)))
            .toEqual(expect.arrayContaining(["count", "minCount", "maxCount"]));
    });

    test("チェックボックスをOFFにすると、localStorageから消える", async () => {
        const storage = new MemoryStorage();
        render(<Counter title="Test Counter" storage={storage} />);
        const checkbox = screen.getByRole<HTMLInputElement>("checkbox");
        fireEvent.click(checkbox);
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(false); // 二度クリックすると false に戻る

        expect(await storage.load(STORAGE_KEY)).toBe(null);
    });
});
