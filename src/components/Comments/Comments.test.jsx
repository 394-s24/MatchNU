import { describe, expect, test, vi } from "vitest";
import useDbData from "../../hooks/useDbData";
import getUserById from "../Event/getUserById";
import { screen, render } from "@testing-library/react";
import { UserContext } from "../../contexts/UserContext";
import Comments from "./Comments";

vi.mock("../../hooks/useDbData");
vi.mock("../Event/getUserById");

const mockComments = {
    1: {
        created_at: "2023-03-29T14:32:33.494Z",
        text: "This is a comment",
        user_id: 1
    },
    2: {
        created_at: "2023-03-29T14:32:33.494Z",
        text: "This is another comment",
        user_id: 2
    }
}



describe("Comments tests", () => {
  beforeEach(() => {
    useDbData.mockReturnValue([mockComments, vi.fn()]);
    getUserById.mockReturnValue({id: 1});
  });

  test("renders mock data for comments", async () => {
    render(
      <UserContext.Provider value={{ user: { id: 1 }, setUser: vi.fn() }} >
        <Comments eventId={"-NuG-baNMzCJN2CR2iVT"} />
      </UserContext.Provider>
    );

    expect(await screen.findAllByTestId("comment")).toHaveLength(2);
  });
});