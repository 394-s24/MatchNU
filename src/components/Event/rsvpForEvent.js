import { getData, setData } from '../../firebase/utils';

const rsvpForEvent = async (userId, eventId, rsvp) => {
    const eventSnapshot = await getData(`events/${eventId}`);
    
    if (!eventSnapshot.exists()) {
        console.log('Event does not exist');
        return;
    }

    const event = eventSnapshot.val();
    const attendees = event.attendees_ids || []; // Ensure attendees_ids is always an array
    
    if (rsvp === false) {
        const index = attendees.indexOf(userId);
        if (index > -1) {
            attendees.splice(index, 1); // Remove the user from the list
            await setData(`events/${eventId}/attendees_ids`, attendees);
            console.log('RSVP cancellation successful');
        } else {
            console.log('User not found in attendees list');
        }
        return;
    }

    if (!attendees.includes(userId)) {
        attendees.push(userId); // Add the user to the list only if not already included
        await setData(`events/${eventId}/attendees_ids`, attendees);
        console.log('RSVP successful');
    } else {
        console.log('User already RSVPed');
    }
};

export default rsvpForEvent;
