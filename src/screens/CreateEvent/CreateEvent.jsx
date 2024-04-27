import { useEffect, useState, useContext } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";
import getTags from "../getTags";
import createEvent from "./createEvent";
import { UserContext } from "../../contexts/UserContext";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [tags, setTags] = useState([]);
  // const [filteredTags, setFilteredTags] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [tagSearchQuery, setTagSearchQuery] = useState("");

  useEffect(() => {
    getTags().then((tags) => {
      setTags(tags);
      // setFilteredTags(tags); // Initially display all tags
    });
  }, []);

  // const handleSearchChange = (e) => {
  //   const searchTerm = e.target.value;
  //   setSearch(searchTerm);
  //   setFilteredTags(
  //     tags.filter((tag) =>
  //       tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   );
  // };


    const filteredTags = tagSearchQuery
    ? tags.filter((tag) =>
        tag.name.toLowerCase().includes(tagSearchQuery.toLowerCase())
      )
    : tags.filter((tag) => tag.type === 0);

  const handleTagSelect = (tag) => {
    if (selectedTags.some(selectedTag => selectedTag.id === tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
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
            thumnail_url: "https://via.placeholder.com/150",
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
          {/* <Form.Control
            type="text"
            placeholder="Search tags"
            value={search}
            onChange={handleSearchChange}
          /> */}
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select Tags
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <Dropdown.ItemText>
                <input
                  type="text"
                  placeholder="Search tags..."
                  value={tagSearchQuery}
                  onChange={(e) => setTagSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "5px 10px",
                    margin: "5px 0",
                  }}
                />
              </Dropdown.ItemText>
              {filteredTags.map((tag) => (
                <Dropdown.Item
                  key={tag.id}
                  onClick={() => handleTagSelect(tag)}
                  active={selectedTags.some(selectedTag => selectedTag.id === tag.id)}
                >
                  {tag.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          
            {selectedTags.length > 0 && <ListGroup>
              Selected Tags:
            {selectedTags.map((tag) => (
              <ListGroup.Item key={tag.id}>{tag.name}</ListGroup.Item>
            ))}
          </ListGroup>}
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
