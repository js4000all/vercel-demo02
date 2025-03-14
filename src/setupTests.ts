import '@testing-library/jest-dom';
import { vi } from "vitest";

beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
});
