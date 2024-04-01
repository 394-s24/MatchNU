import { useEffect, useState } from "react";
import Event from "../components/Event/Event";
import getEvents from "./getEvents";
import getTags from "./getTags";
import { Dropdown } from 'react-bootstrap';

const Homepage = () => {
  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  // const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    getEvents().then(events => setEvents(events));

    getTags().then((tags) => setTags(tags));
  }, []);


  let filteredEvents = !!selectedTag ? events.filter(event=> event.tags.includes(selectedTag.id)) : events;
  
  if (searchQuery) {
    
    filteredEvents = filteredEvents.filter(event => {
      const query = searchQuery.toLowerCase();

      const titleMatch = event.title.toLowerCase().includes(query);
            
      const eventAtMatch = (new Date(event.event_time)).toLocaleString().toLowerCase().includes(query);
      
      const descriptionMatch = event.description.toLowerCase().includes(query);

      return titleMatch || descriptionMatch || eventAtMatch;
    });
  }

  const searchSubmit = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  }



  // console.log(events);
  // console.log(tags);

  return (
    <div className="homepage">
      <nav className="navbar bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand">MatchNU</a>
        <form className="d-flex" role="search" style={{width: 180}}>
          <input 
          className="form-control me-2" 
          type="search" placeholder="Search" 
          aria-label="Search"
          value={searchQuery}
          onChange={searchSubmit}/>
          
        </form>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Filter
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedTag(null)}>All</Dropdown.Item>
            {tags.map((tag, index)=> (
              <Dropdown.Item key={tag.id} onClick={()=> setSelectedTag(tag)}>{tag.name}</Dropdown.Item>
            ))}
            
          </Dropdown.Menu>
        </Dropdown>

      </div>
    </nav>
    <h1 style={{padding: 10}}> Upcoming {!!selectedTag && selectedTag.name} Events </h1>
    <div>
      {
        filteredEvents.length === 0 ? ("No events found!") : filteredEvents.map((event) => <Event key={event.id} {...event}/>)
      }
    </div> 
  </div>

  );
};

export default Homepage;
