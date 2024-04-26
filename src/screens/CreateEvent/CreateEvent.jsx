import { useEffect, useState, useContext } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";
import getTags from "../getTags";
import createEvent from "./createEvent";
import { UserContext } from "../../contexts/UserContext";


const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [search, setSearch] = useState("");
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
    setFilteredTags(
      tags.filter((tag) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
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

          const date = new Date(e.target.date?.value);
          const time = e.target.time?.value;

          const eventTime = new Date(date.toISOString().split('T')[0] + 'T' + time + 'Z').toISOString();

          await createEvent({
            attendee_ids: {0: user.id},
            created_at: new Date(Date.now()).toISOString(),
            description: e.target.description?.value,
            event_time: eventTime,
            location: e.target.location?.value,
            tags: selectedTags.map((tag) => tag.id),
            // thumbnail_url: e.target.thumbnail?.files[0],
            thumnail_url: "data:image/jpeg;base64,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",
            user_id: user.id,            
            title: e.target.title.value,
          });
          navigate("/");
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
          <Form.Control
            id="date"
            type="date"
            placeholder="Enter event date"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Time</Form.Label>
          <Form.Control
            id="time"
            type="time"
            placeholder="Enter event time"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            id="location"
            type="text"
            placeholder="Enter event location"
            required
          />
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
            {filteredTags.map((tag) => (
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
