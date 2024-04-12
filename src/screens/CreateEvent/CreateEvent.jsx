import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./CreateEvent.css";

const CreateEvent = () => {
  return (
    <div id="create-event-container">
      <h1>Create an event</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="title"
            type="text"
            placeholder="Enter event title"
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
          <Form.Control id="date" type="date" placeholder="Enter event date" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Time</Form.Label>
          <Form.Control id="time" type="time" placeholder="Enter event time" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Enter event location" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tags</Form.Label>
          <Form.Control type="text" placeholder="Enter event tags" />
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
