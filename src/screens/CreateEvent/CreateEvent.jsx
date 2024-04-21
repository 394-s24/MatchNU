
import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from 'react-router-dom';
import "./CreateEvent.css";
import getTags from "../getTags";
// import createEvent from "./createEvent";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    getTags().then((tags) => {
      setTags(tags);
      setFilteredTags(tags); // Initially display all tags
    });
  }, []);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setFilteredTags(tags.filter(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div id="create-event-container">
      <h1>Create an event</h1>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          // await createEvent({
          //   title: e.target.title.value,
          //   description: e.target.description?.value,
          //   date: e.target.date.value,
          //   time: e.target.time.value,
          //   location: e.target.location.value,
          //   tags: e.target.tags?.value,
          //   thumbnail: e.target.thumbnail?.files[0],
          // });
          navigate('/');
        }}
      >
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="title"
            type="text"
            placeholder="Enter event title"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            id="description"
            type="text"
            placeholder="Enter event description"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control id="date" type="date" placeholder="Enter event date" required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Time</Form.Label>
          <Form.Control id="time" type="time" placeholder="Enter event time" required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Enter event location" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search tags"
            value={search}
            onChange={handleSearchChange}
          />
          <ListGroup>
            {filteredTags.map(tag => (
              <ListGroup.Item
                key={tag.id}
                action
                onClick={() => handleTagSelect(tag)}
                active={selectedTags.includes(tag)}
              >
                {tag.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Thumbnail</Form.Label>
          <Form.Control
            id="thumbnail"
            type="file"
            accept="image/*"
            placeholder="Enter event thumbnail"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateEvent;
