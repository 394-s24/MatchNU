import { useEffect, useState, useContext } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";
import getTags from "../getTags";
import createEvent from "./createEvent";
import createTag from "./createTag";
import { UserContext } from "../../contexts/UserContext";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tagType, setTagType] = useState("General");
  const [tagsLength, setTagsLength] = useState(0);

  const [tagSearchQuery, setTagSearchQuery] = useState("");

  useEffect(() => {
    getTags().then((tags) => {
      setTags(tags);
      setTagsLength(tags.length);
    });
  }, []);


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

  const handleAddNewTag = async () => {
    if (newTag && !tags.some((tag) => tag.name === newTag)){
      const newTagObject = {
        tag: newTag,
        type: tagType === 'General' ? 0 : 1,
      };
      const tagid = await createTag(newTagObject);
      setTagsLength(tagsLength + 1);
      setErrorMessage("");
      setSelectedTags([...selectedTags, {id: tagid, name: newTag, type: tagType === 'General' ? 0 : 1}]);
      setNewTag("");
    } else {
      setErrorMessage("Tag already exists or is empty");
      setNewTag("");
    }
  }
  
  return (
    <div id="create-event-container" overflow="auto">
      <h1>Create an event</h1>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();

          const date = new Date(e.target.date?.value);
          const time = e.target.time?.value;

          const eventTime = new Date(date.toISOString().split('T')[0] + 'T' + time + 'Z').toISOString();

          await createEvent({
            attendees_ids: {0: user.id},
            created_at: new Date(Date.now()).toISOString(),
            description: e.target.description?.value,
            event_time: eventTime,
            location: e.target.location?.value,
            tags: selectedTags.map((tag) => tag.id),
            thumbnail_url: e.target.thumbnail?.value,
            user_id: user.id,            
            title: e.target.title.value,
          });
          navigate("/");
        }}
      >
        <Form.Group>
          <Form.Label><strong>Title</strong></Form.Label>
          <Form.Control
            id="title"
            type="text"
            placeholder="Enter event title"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label><strong>Description</strong></Form.Label>
          <Form.Control
            id="description"
            type="text"
            placeholder="Enter event description"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label><strong>Date</strong></Form.Label>
          <Form.Control
            id="date"
            type="date"
            placeholder="Enter event date"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label><strong>Time</strong></Form.Label>
          <Form.Control
            id="time"
            type="time"
            placeholder="Enter event time"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label><strong>Location</strong></Form.Label>
          <Form.Control
            id="location"
            type="text"
            placeholder="Enter event location"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label><strong>Tags</strong></Form.Label>
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
          <Form.Group style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
            <Form.Control
              type="text"
              placeholder="Add new tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              style={{ width: "85%", display: "inline-block" }}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              label={tagType}
              onChange={() => setTagType(tagType === 'General' ? 'Specific' : 'General')}
              style={{margin: "0 10px" }}
            />
            <Button variant="primary" style={{ marginLeft: "10px" }} onClick={handleAddNewTag}>
              +
            </Button>
          </Form.Group>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {selectedTags.length > 0 && <ListGroup>
              Selected Tags:
            {selectedTags.map((tag) => (
              <ListGroup.Item key={tag.id}>{tag.name}</ListGroup.Item>
            ))}
          </ListGroup>}
        </Form.Group>

        <Form.Group>
          <Form.Label><strong>Thumbnail</strong></Form.Label>
          <Form.Control
            id="thumbnail"
            type="text"
            placeholder="Enter thumbnail URL"
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
