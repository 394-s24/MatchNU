import { describe, expect, test, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { UserContext } from "../../contexts/UserContext";
import Navigation from "../../Navigation";

describe("Event tests", () => {
  test("passes" , () => {
    expect(true).toBe(true);
  });

  test("renders an event", async () => {
    render(
      <UserContext.Provider value={{ user: { id: 1 }, setUser: vi.fn() }}>
        <Navigation />
      </UserContext.Provider>
    );

    expect(screen.queryByTestId("event-card")).toBeDefined();
  });

  test("renders event details", async () => {
      render(
        <UserContext.Provider value={{ user: { id: 1 }, setUser: vi.fn() }}>
          <Navigation />
        </UserContext.Provider>
      );

      fireEvent.click((await screen.findAllByTestId("learn-more-button")).at(0));
      expect(screen.queryByTestId("event-details")).toBeDefined();

      expect(screen.queryByTestId("attendees")).toBeDefined();
      expect(await screen.findAllByTestId("attendee")).toBeDefined();
  });
});