// Import statements for Vitest and your function
import { describe, it, expect, vi } from 'vitest';
import { pushData } from '../../firebase/utils';
import { addComment } from './addComment';  // Adjust the path as needed

// Mock the pushData function from firebase/utils
vi.mock('../../firebase/utils', () => ({
  pushData: vi.fn(() => Promise.resolve({
    key: '123'  // Simulate the Firebase reference key returned after pushing data
  }))
}));

describe('addComment Function Tests', () => {
  it('should correctly format and push a new comment', async () => {
    const text = "This is a test comment";
    const eventId = "event1";
    const userId = "user1";

    // Call the function
    const result = await addComment(text, eventId, userId);

    // Check if pushData was called correctly
    expect(pushData).toHaveBeenCalledWith(`comments/${eventId}`, {
      text,
      user_id: userId,
      created_at: expect.any(String)  // Check if the created_at is a string, indicating a date
    });

    // Check the result format
    expect(result).toEqual({
      text,
      user_id: userId,
      created_at: expect.any(String),
      id: '123'
    });
  });
});
