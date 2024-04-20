import { useEffect, useState } from "react";
import Event from "../components/Event/Event";
import getEvents from "./getEvents";

import getTags from "./getTags";
import { Dropdown } from 'react-bootstrap';

const Homepage = () => {
  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagSearchQuery, setTagSearchQuery] = useState('');

  useEffect(() => {
    getEvents().then(events => setEvents(events));

    getTags().then((tags) => setTags(tags));
  }, []);


  let filteredEvents = !!selectedTags.length ? events.filter(event => selectedTags.every(tag => event.tags.includes(tag.id))) : events;
  
  if (searchQuery) {
    
    filteredEvents = filteredEvents.filter(event => {
      const query = searchQuery.toLowerCase();

      const titleMatch = event.title.toLowerCase().includes(query);
            
      const eventAtMatch = (new Date(event.event_time)).toLocaleString().toLowerCase().includes(query);
      
      const descriptionMatch = event.description.toLowerCase().includes(query);

      return titleMatch || descriptionMatch || eventAtMatch;
    });

  }

  const filteredTags = tagSearchQuery ? tags.filter(tag => 
    tag.name.toLowerCase().includes(tagSearchQuery.toLowerCase())
  ) : tags.filter(tag => tag.type === 0);
  

  const searchSubmit = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  }


  return (
    <div className="homepage">
      <nav className="navbar bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand">MatchNU</a>
        <form className="d-flex" role="search" style={{width: 160}}>
          <input 
          className="form-control" 
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
            <Dropdown.ItemText>
              <input
                type="text"
                placeholder="Search tags..."
                value={tagSearchQuery}
                onChange={(e) => setTagSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '5px 10px', margin: '5px 0' }}
              />
            </Dropdown.ItemText>
            <Dropdown.Item onClick={() => setSelectedTags([])}>All</Dropdown.Item>
            {filteredTags.map((tag, index) => (
              <Dropdown.Item key={tag.id} onClick={() => setSelectedTags(
                selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag]
              )}
              style={{
                backgroundColor: selectedTags.includes(tag) ? '#007bff' : 'transparent', // Example color change
                color: selectedTags.includes(tag) ? 'white' : 'inherit'
              }}>
                {tag.name}
              </Dropdown.Item>
        ))}
            
          </Dropdown.Menu>
        </Dropdown>

      </div>
    </nav>
    <div style={{paddingBottom: 50}}>
      {
        filteredEvents.length === 0 ? ("No events found!") : filteredEvents.map((event) => <Event key={event.id} {...event}/>)
      }
    </div> 
  </div>

  );
};

export default Homepage;
