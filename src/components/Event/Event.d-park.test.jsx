import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getData, setData } from '../../firebase/utils';
import rsvpForEvent from './rsvpForEvent';

vi.mock('../../firebase/utils', () => ({
  getData: vi.fn(),
  setData: vi.fn()
}));

describe('rsvpForEvent Functionality', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should add a user to the event attendees when RSVP is true', async () => {
    getData.mockResolvedValue({
      exists: () => true,
      val: () => ({ attendees_ids: [] })
    });

    await rsvpForEvent('user123', 'event123', true);

    expect(setData).toHaveBeenCalledWith('events/event123/attendees_ids', ['user123']);
  });

  it('should remove a user from the event attendees when RSVP is false', async () => {
    getData.mockResolvedValue({
      exists: () => true,
      val: () => ({ attendees_ids: ['user123'] }) 
    });

    await rsvpForEvent('user123', 'event123', false);

    expect(setData).toHaveBeenCalledWith('events/event123/attendees_ids', []);
  });

  it('should handle cases where the event does not exist', async () => {
    getData.mockResolvedValue({
      exists: () => false,
      val: () => null
    });

    await rsvpForEvent('user123', 'event123', true);

    expect(setData).not.toHaveBeenCalled();
  });

  it('should handle cases where the attendees list does not exist', async () => {
    getData.mockResolvedValue({
      exists: () => true,
      val: () => ({})
    });

    await rsvpForEvent('user123', 'event123', true);

    expect(setData).toHaveBeenCalledWith('events/event123/attendees_ids', ['user123']);
  });
});
