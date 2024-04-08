import React, {useContext, useState, useEffect} from "react";
import { UserContext } from '../../contexts/UserContext';
import ProfilePicture from "../../components/ProfilePicture";
import Nav from 'react-bootstrap/Nav';
import getEvents from "../getEvents";


const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('Host');
  const [events, setEvents] = useState([]);
  const [hostedEvents, setHostedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  useEffect(() => {
    if (user) {
      getEvents().then(events => setEvents(events));
      setHostedEvents(events.filter(event=> event.user_id == (user.id)))
      setJoinedEvents(events.filter(event=> event.attendees_ids.includes(user.id)))
    }
  }, [user]);
  return (
    <div>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-xs-12 col-sm-4">
          <ProfilePicture imageURL={user.profile_picture} />
          </div>
          <div className="col-xs-12 col-sm-8">
            <div className="card-body">
              <h5 className="card-title">{user.username}</h5>
              <p className="card-text"><small className="text-muted">{user.email}</small></p>
            </div>
          </div>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="/Host" onSelect={(selectedKey) => setActiveTab(selectedKey)}>
        <Nav.Item>
          <Nav.Link eventKey="Host">Host</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Join">Join</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === 'Host' && (
        <ul>

          {hostedEvents.length === 0 ? (
            'No events'
          ) : (
            hostedEvents.map((event) => (
              <Event key={event.id} {...event}/>
            ))
         )}   
        </ul>
      )}
      {activeTab === 'Join' && (
         <ul>
         {joinedEvents.length === 0 ? (
           'No events'
         ) : (
           joinedEvents.map((event) => (
            <Event key={event.id} {...event}/>
           ))
         )}
       </ul>
      )}
    </div>
  )
};

export default Profile;