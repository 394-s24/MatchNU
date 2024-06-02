import { describe, expect, test, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserContext } from "../../contexts/UserContext";
import Event from "./Event";
import Navigation from "../../Navigation";


// Mock data fetching functions
vi.mock('./getUserById', () => ({
  __esModule: true,
  default: vi.fn(() => Promise.resolve({ id: 1, username: 'testuser', profile_picture: 'url' }))
}));
vi.mock('./getTagsByIds', () => ({
  __esModule: true,
  default: vi.fn(() => Promise.resolve([{ tag: 'tag1' }]))
}));
vi.mock('./getRsvpStatus', () => ({
  __esModule: true,
  default: vi.fn(() => Promise.resolve(false))
}));

describe("Event Component Tests", () => {
  let userMock, eventProps;

  beforeEach(() => {
    render(
      <UserContext.Provider value={{ user: { id: 1 }, setUser: vi.fn() }}>
        <Navigation />
      </UserContext.Provider>
    );
    eventProps = {
      id: "event1",
      user_id: "user1",
      tags: [],
      title: "Test Event",
      event_time: new Date().toISOString(),
      location: "Virtual",
      thumbnail_url: "some_url",
    };

    vi.resetAllMocks();
  });

  test("toggle RSVP updates button text and style", async () => {
    render(
      <UserContext.Provider value={{ user: userMock, setUser: userMock.setUser }}>
        <Event {...eventProps} />
      </UserContext.Provider>
    );

    await waitFor(() => {
      // Ensure all promises resolve
      const rsvpButton = screen.getByTestId("rsvp-button");
      expect(rsvpButton.textContent).toBe("RSVP");
    });

    // Simulate clicking the RSVP button
    fireEvent.click(screen.getByTestId("rsvp-button"));

    // Wait for the button text to update
    await waitFor(() => {
      expect(screen.getByTestId("rsvp-button").textContent).toBe("Can't go :(");
      expect(screen.getByTestId("rsvp-button").style.backgroundColor).toBe("red");
    });
  });
});
