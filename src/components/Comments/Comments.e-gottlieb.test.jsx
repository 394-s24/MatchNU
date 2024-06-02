import { describe, expect, test, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  act
} from "@testing-library/react";
import { UserContext } from "../../contexts/UserContext";
import Navigation from "../../Navigation";
import Comments from "./Comments";
import { addComment } from "./addComment";

vi.mock("./addComment");

const mock_return = {
    created_at: "2023-03-29T14:32:33.494Z",
    text: "This is a comment",
    user_id: 1,
    id: 2
}

describe("Comments tests", () => {
    beforeEach(() => {
        addComment.mockReturnValue(mock_return);
    });

  test("renders the comments", async () => {
    render(
      <UserContext.Provider value={{ user: { id: 1 }, setUser: vi.fn() }}>
        <Navigation />
      </UserContext.Provider>
    );

    fireEvent.click((await screen.findAllByTestId("comment-button")).at(0));
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

  test("send comment", async () => {
    render(
      <UserContext.Provider value={{ user: { id: 1 }, setUser: vi.fn() }}>
        <Comments eventId={"-NuG-baNMzCJN2CR2iVT"} />
      </UserContext.Provider>
    );

    fireEvent.click(screen.queryByTestId("send-comment-button"));
    expect(screen.queryByTestId("comment-popup")).toBeDefined();

    fireEvent.change(screen.queryByTestId("comment-input"), { target: { value: "This is a comment" } });
    expect(screen.queryByTestId("comment-input").value).to.equal("This is a comment");


    await act(async () => {
        fireEvent.click(screen.queryByTestId("submit-comment-button"));
    });
    expect(screen.queryByTestId("comment-popup")).toBeNull();
  });


});