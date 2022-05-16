import { render, screen } from "@testing-library/react";
import Donate from "./Donate";

it("renderiza un h1", () => {
    render(<Donate />)

    expect(screen.getByRole("heading", {level: 1})).toBeInTheDocument();
})