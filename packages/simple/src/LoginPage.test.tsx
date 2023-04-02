import React from "react";
import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  it("should render the login page", () => {
    render(<LoginPage />);
    const headerElement = screen.getByText(/sign in to your account/i);
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const registerButton = screen.getByRole("button", { name: /register/i });
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    expect(headerElement).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });
});
