import { useState, useEffect } from "react";
import getTagsByIds from "../Event/getTagsByIds";
import getUserById from "../Event/getUserById";
import ProfilePicture from "../ProfilePicture";
import Tag from "../Tag";
import getAttendeesByEventId from "./getAttendeesByEventId";

const Popup = ({ id, title, description, tags, event_time, onClose }) => {
  const [tagsString, setTags] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [attendees_ids, setAttendeesIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTags = await getTagsByIds(tags);
        setTags(fetchedTags);

        const fetchedAttendeesIds = await getAttendeesByEventId(id);
        setAttendeesIds(fetchedAttendeesIds);

        // If there are no attendees, avoid making unnecessary calls
        if (fetchedAttendeesIds.length === 0) {
          setAttendees([]);
          return;
        }

        const fetchedAttendees = await Promise.all(
          fetchedAttendeesIds.map((id) => getUserById(id))
        );
        setAttendees(fetchedAttendees);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle errors as appropriate for your application
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 1000, // Ensure it's above other content
        border: "1px solid #ccc",
        borderRadius: "15px",
        width: "80%",
      }}
      data-testid="event-details"
    >
      <h2>{title}</h2>
      <p>{description}</p>
      <div>
        {tagsString.map((tag, index) => (
          <Tag key={index}>{tag["tag"]}</Tag>
        ))}
      </div>
      <p>{new Date(event_time).toLocaleString()}</p>
      <h3>Attendees:</h3>

      <ul
        style={{
          display: "flex",
          flexDirection: "row", // Lay out children horizontally
          overflowX: "scroll", // Enable horizontal scrolling
          whiteSpace: "nowrap", // Prevent wrapping of child elements
          padding: "10px 0", // Optional: Add some padding at the top and bottom
        }}
        data-testid="attendees"
      >
        {attendees.map((attendee, index) => (
          <div
            key={index}
            style={{
              display: "inline-block", // Use inline-block for horizontal layout
              marginRight: "20px", // Add some space between elements
            }}
            data-testid="attendee"
          >
            <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {attendee.username}
              {attendee.profile_picture ? (
                <ProfilePicture imageURL={attendee.profile_picture} />
              ) : (
                <ProfilePicture
                  imageURL={
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMHBhASBxIQFhIWEBgQFxgSFQ8TERISFhEWFxUVGxgYHSggGBolHRUXITEjJSorLi4uFx8zOD84NygtLisBCgoKDg0OGBAQFy0dHR4rKysrLS0tLS0rLSstLS0tLS0tLS0rKystLS0tLS0rKy0rKy0rLS0tLTctNS0rNysrLv/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAABQIEBgMBB//EADoQAQABAgMECAMFBwUAAAAAAAABAgMEBRESITFRE0FhcZHB0eEiM6EjYnKBsRQyU4KSwvAVJDRCUv/EABgBAQEBAQEAAAAAAAAAAAAAAAADAgEE/8QAHREBAQEAAgMBAQAAAAAAAAAAAAECETEDQVEhEv/aAAwDAQACEQMRAD8A/RAHpSAAAAAAAAAAAfaKJrq0oiZnsiZkHwblrLLlzjER+KfRtUZL/Er8IZuo7xUkVcVgbWEta3JrmeqNad8+CU7LyWcADrgAAAAAAAAAAAAAAAAAABEazpAD2w2ErxM/ZRu5zuhRwOVaRtYr+n1VYjZjSngnrfxqZTsPlFNHzpmqfCFC3bi3TpbiIjsjRkJ22t8ADgm5xhar1MVW9+kb47OcIjrWhj8ujEa1Wt1X0q7/AFUzvj8rNiCPtyibdcxXGkw+KsAAAAAAAAAAAAAAAAAAC7lWC6GiKrkfFMf0x6peW2enxlMTwj4p7o99HSJ7vprMAEmwAAAAAGpmGDjFW9370cJ8pc7MaTvdagZzZ6PFaxwqjX8+vyUxfTOo0QFWAAAAAAAAAAAAAAAAFTIadblc8oiPGZ9FlJyDhc/l81ZDfamegBl0AAAAAAS8+p+xon72njHsqJ2ef8SPxx+ktZ7cvSGAumAAAAAAAAAAAAAAAAq5BO+5/L/csIuRT9tXH3fP3WkN9qZ6AGXQAAAAABNz2f8Aa0/j/tlSS8+n7KiO2Z+nu1nty9IwC6YAAAAAAAAAAAAAAACjkcT+1TOk6bMxr1a6wuNbLtP2GjZ/8/XrbKGrzVJ0AMugAAAAACTn0TOxpE6b9eUcFZhe06Kra4aTr3aOy8VyuVHyH16EwAAAAAAAAAAAAAAAF7Ja9rBacqpjz82+kZDc3V0z2VeU+SuhrtSdADLoAAAAAA1sxr2MDXP3dPHd5tlOzu5s4WI51fSN/o7O3KhgPQmAAAAAAAAAAAAAAAAyt3JtXImnqnV1VM7Uaw5N0WV3elwVPZ8Ph7aJ+Se2stsBJsAAAAAAczjrvS4uueramI7o3OhxV3ocPVVyj69Tl1PHPbOgBVgAAAAAAAAAAAAAAAAUskxGxdmir/tvjvj2/RNInZnWnjxcs5jsdaPHCXemw1NVXGY3972edQAAAABjXVsUTPKNQTM8v6URRT1/FPd1f52I7K7cm7cmq5xnexXzOInaANOAAAAAAAAAAAAAAAAAPgOmwFOzgrf4Ynx3thjap2LcRyiI8IZPNVQAAABjcjaomOcaMgHIvrO/TsXqo5VTH1YPSkAAAAAAAAAAAAAAAAAAKmUYSm9amq7GvxaRx5R6pbo8stdFgqYnjMbXjvY3eI1ltAItgAAAAAJmbYSmMPVXRHxaxM8d+s6T+qK6jE2+mw9VPOmY/Pqcvw4q4v4xoAUZAAAAAAAAAAAAAbWHy+u/wjSOdW5y3gar1sYarET9lEz29UfmsYfKaLfzfint3R4N+mNmNKeDF8nxqZTMNlEUb8ROs8o3U+6oCdtrUgA46AAAAAAJ+Lyum9MzanZqnfziZUB2XgczicHXhvmRu5xvh4Ot4tHE5ZRe30/DPZw8FJ5PrFygDcxGW12eEbUfd4+DT4cW5ZXAB1wAAAAGdm1Ver0tRMyrYbKIp34mdZ5Rujx62bqR2TlIt25u1aW4mZ7FDD5PVV8+dOyN8+izbtxbp0txER2bmSd3fTUy1sPgqMP+5Tv5zvn2bIMNAAAAAAAAAAAAAAAADwv4WjEfNpjv4T4vcBGxGTzG/D1a9lXHxTr1mqxVpdpmO/h4uqfKqYrp0qiJjt4NzdZuXJi3icppub7Hwzy40+yTiMPVh6tLsafpP5qTUrNnDyAacdRh7FOHt6Wo9Z7ZeoPMqAAAAAAAAAAAAAAAAAAAAAAAAMLtuLtExcjWGYCd/o9vnX4x6CiNf1XOABl0AAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="
                  }
                />
              )}
            </li>
          </div>
        ))}
      </ul>

      <button
        className="btn btn-primary"
        onClick={onClose}
        style={{ marginTop: "10px" }}
      >
        Close
      </button>
    </div>
  );
};

export default Popup;
