import { getData } from "../../firebase/utils";

const getRsvpStatus = async(userId, eventId) => {
    const attendees = await getData(`events/${eventId}/attendees_ids`);
    if (!attendees.exists()) return false;
    const attendeesVal = attendees.val();
    console.log(attendeesVal.includes(userId));
    return attendeesVal.includes(userId);
};

export default getRsvpStatus;