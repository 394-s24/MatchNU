import { getData } from "../../firebase/utils";

const getAttendeesByEventId = async(eventId) => {
    const attendees = await getData(`events/${eventId}/attendees_ids`);
    
    if (!attendees.exists()) return [];
    return attendees.val();
};

export default getAttendeesByEventId;