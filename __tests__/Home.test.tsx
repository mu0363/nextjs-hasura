import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../src/pages/index";

// Absolute pathでtestが通らなかった時 ↓
// https://til.hashrocket.com/posts/lmnsdtce3y-import-absolute-paths-in-typescript-jest-tests

https: it("Should render title text", () => {
  render(<Home />);
  expect(screen.getByText("Next.js + Graphql")).toBeInTheDocument();
});
