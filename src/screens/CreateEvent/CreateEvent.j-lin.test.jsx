import { fireEvent, render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { describe, expect } from "vitest";

import { UserContext } from "../../contexts/UserContext";
import AppRoutes from "../../AppRoutes";

vi.mock("./createEventWow");

describe("CreateEvent tests", () => {
  test("renders create event screen", async () => {
    render(
      <UserContext.Provider value={{ user: { id: 1 }, setUser: vi.fn() }}>
        <MemoryRouter initialEntries={["/create-event"]}>
          <AppRoutes />
        </MemoryRouter>
      </UserContext.Provider>
    );

    expect(screen.queryByTestId("create-event-screen")).toBeDefined();
  });

  test("filling in form redirects to home", async () => {
    render(
      <UserContext.Provider value={{ user: { id: 1 }, setUser: vi.fn() }}>
        <MemoryRouter initialEntries={["/create-event"]}>
          <AppRoutes />
        </MemoryRouter>
      </UserContext.Provider>
    );

    fireEvent.input(screen.getByTestId("title-input"), {
      target: { value: "Test Title" },
    });
    fireEvent.input(screen.getByTestId("description-input"), {
      target: { value: "Test Title" },
    });
    fireEvent.input(screen.getByTestId("date-input"), {
      target: { value: "Test Title" },
    });
    fireEvent.input(screen.getByTestId("time-input"), {
      target: { value: "Test Title" },
    });
    fireEvent.input(screen.getByTestId("event-input"), {
      target: { value: "Test Title" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));
    expect(screen.queryByTestId("create-event-screen")).toBeDefined();
  });
});
