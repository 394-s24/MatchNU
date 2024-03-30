import getData from "../firebase/utils";

const getEvents = async() => {
  const events = await getData('events');

  return events;
};

export default getEvents;