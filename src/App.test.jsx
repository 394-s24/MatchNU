import { describe, expect, test, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";
import { UserContext } from "./contexts/UserContext";
import Navigation from "./Navigation";

describe("App tests", () => {
  test("renders login screen", async () => {
    render(<App />);
    expect(screen.queryByTestId("login-screen")).toBeDefined();
  });

  test("logins", async () => {
    render(
      <UserContext.Provider value={{ user: { id: 1 }, setUser: vi.fn() }}>
        <Navigation />
      </UserContext.Provider>
    );

    expect(screen.queryAllByTestId("event-card")).toBeDefined();
  });

  test("does not login", async () => {
    render(
      <UserContext.Provider value={{ user: null, setUser: vi.fn() }}>
        <Navigation />
      </UserContext.Provider>
    );

    expect(screen.queryByTestId("login-screen")).toBeDefined();
    expect(screen.queryByTestId("event-card")).toBeNull();
  });

  test("renders an event", async () => {
    render(
      <UserContext.Provider value={{ user: { id: 1 }, setUser: vi.fn() }}>
        <Navigation />
      </UserContext.Provider>
    );

    expect(screen.queryByTestId("event-card")).toBeDefined();
  });

  test("renders navbar", async () => {
    render(
      <UserContext.Provider value={{ user: { id: 1 }, setUser: vi.fn() }}>
        <Navigation />
      </UserContext.Provider>
    );

    expect(screen.queryByTestId("bottom-navbar")).toBeDefined();
  });

  test("navbar redirects", async () => {
    render(
      <UserContext.Provider value={{ user: { id: 1 }, setUser: vi.fn() }}>
        <Navigation />
      </UserContext.Provider>
    );

    expect(screen.queryByTestId("bottom-navbar")).toBeDefined();
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

  test("renders comments", async () => {
    render(
      <UserContext.Provider value={{ user: { id: 1 }, setUser: vi.fn() }}>
        <Navigation />
      </UserContext.Provider>
    );

    fireEvent.click((await screen.findAllByTestId("comment-button")).at(0));
    expect(screen.queryByTestId("event-comments")).toBeDefined();
    expect(screen.queryByTestId("comments")).toBeDefined();
    expect(screen.queryByText("Comments")).toBeDefined();
    expect(
      (await screen.findAllByTestId("profile-picture")).at(0)
    ).toHaveProperty("src");
    expect(screen.queryByText("Send Comment")).toBeDefined();
    expect(await screen.findAllByTestId("comment")).toBeDefined();

    fireEvent.click(screen.queryByTestId("send-comment-button"));
    expect(screen.queryByTestId("comment-popup")).toBeDefined();

    fireEvent.click(screen.queryByTestId("cancel-comment-popup"));
    expect(screen.queryByTestId("comment-popup")).toBeNull();
  });

  test("renders create event screen", async () => {
    render(
      <UserContext.Provider value={{ user: { id: 1 }, setUser: vi.fn() }}>
        <Navigation />
      </UserContext.Provider>
    );

    fireEvent.click(screen.queryByTestId("create-event-button"));
    expect(screen.queryByTestId("create-event-screen")).toBeDefined();

    fireEvent.change(screen.queryByTestId("add-new-tag"), {
      target: { value: "Custom" },
    });
    fireEvent.click(screen.queryByTestId("add-tag-button"));
    expect(screen.queryByText("Custom")).toBeDefined();

    fireEvent.click(screen.queryByText("Select Tags"));
    expect(await screen.findAllByTestId("tag-item")).toBeDefined();
    expect(await screen.findByTestId("selected-tags")).toBeDefined();
  });
});
