
import React from "react";

function GoogleMap({ currentRoom }) {

  const address = currentRoom.name || "lviv";

  const mapUrl = `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
    `lviv ${address}`
  )}&key=AIzaSyAZJy8DJMQ37dLwHAw2Cnv0ADC6KNl7zpA`;

  return (
    <div>
      <iframe
        title="Google Map"
        width="100%"
        height="400"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapUrl}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
    </div>
  );
}

export default GoogleMap;




