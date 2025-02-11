import { describe, it, expect, Mock, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SessionProvider } from "../../context/AuthContext";
import { Login } from "./Login";
import { getAuth } from "../../services/getAuth";

vi.mock('../../services/getAuth', () => ({
  getAuth: vi.fn()
}))

describe("<Login />", () => {

  const mockGetAuth = getAuth as Mock
  it("Should render the error message", async () => {
    mockGetAuth.mockRejectedValue(new Error('Invalid username or password'))
    render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>
    );

    const userNameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginButton = screen.getByText('Login')

    await act(() => {
      fireEvent.change(userNameInput, { target: { value: 'error-username' }})
      fireEvent.change(passwordInput, { target: { value: 'error-password' }})
      fireEvent.click(loginButton)
    })

    expect(screen.getByText('Invalid username or password')).toBeInTheDocument()
  });
});
