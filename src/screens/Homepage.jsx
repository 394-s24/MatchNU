import { useEffect, useState } from "react";
import Event from "../components/Event";
import getEvents from "./getEvents";

const Homepage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(async (snapshot) => {
      if (!snapshot.exists()) return;

      const eventsVal = snapshot.val();

      const eventIds = Object.keys(eventsVal);
      
      setEvents(eventIds.map((id) => ({
        id,
        ...eventsVal[id]
      })));
    });
  }, []);

  console.log(events);

  return (
    <div className="homepage">
    <h1> Upcoming Events </h1>
    <div>
      {
        events.map((event) => <Event key={event.id} {...event}/>)
      }
      <Event
        user={{ id: 1, username: "Bob" }}
        title={"Study at Main"}
        description={"Let's study at main wow"}
      />
    </div> 
    </div>

  );
};

export default Homepage;
