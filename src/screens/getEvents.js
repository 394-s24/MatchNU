import { getData } from "../firebase/utils";

const getEvents = async() => {
  const events = await getData('events');

  if (!events.exists()) return [];

  const eventsVal = events.val();
      
  const eventsArray = Object.keys(eventsVal).map((id) => ({
    id,
    ...eventsVal[id]
  }));

  eventsArray.sort((a,b) => new Date(a.event_time) - new Date(b.event_time));

  return eventsArray;
};

export default getEvents;