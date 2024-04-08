import { getData, setData } from '../../firebase/utils';

const rsvpForEvent = async (userId, eventId, rsvp) => {
    const event = await getData(`events/${eventId}`);
    const attendees = event.val().attendees_ids;
    
    if (rsvp === false) {
        const index = attendees.indexOf(userId);
        if (index > -1) {
            attendees.splice(index, 1);
            await setData(`events/${eventId}/attendees_ids`, attendees);
            console.log('RSVP successful');
        } else {
            console.log('User not found in attendees list');
        }
        return;
    }

    attendees.push(userId);
    await setData(`events/${eventId}/attendees_ids`, attendees);
    console.log('RSVP successful');
};

export default rsvpForEvent;