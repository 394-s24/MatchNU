import { useEffect, useState } from "react";
import Event from "../components/Event/Event";
import getEvents from "./getEvents";

const Homepage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(async (snapshot) => {
      if (!snapshot.exists()) return;

      const eventsVal = snapshot.val();
      
      const eventsArray = Object.keys(eventsVal).map((id) => ({
        id,
        ...eventsVal[id]
      }));

      eventsArray.sort((a,b) => new Date(a.event_time) - new Date(b.event_time));

      setEvents(eventsArray);
    });
  }, []);

  console.log(events);

  return (
    <div className="homepage">
      <nav className="navbar bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand">MatchNU</a>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Filter</a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Sports</a></li>

          </ul>
        </li>

      </div>
    </nav>
    <h1> Upcoming Events </h1>
    <div>
      {
        events.map((event) => <Event key={event.id} {...event}/>)
      }
    </div> 
  </div>

  );
};

export default Homepage;
