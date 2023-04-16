import React from "react";
import { Container, Image, Button, Card } from "react-bootstrap";

const ProfileView = ({ username, profilePicture, onSignout }) => {
  return (
    <Container className="d-flex flex-column align-items-center my-3">
      <Card.Text style={{ fontSize: "1.5rem" }}>Profile Information</Card.Text>
      <Image src={profilePicture} roundedCircle width={200} height={200} />
      <h2 className="mt-3">{username}</h2>
      <Button variant="danger" className="mt-5" onClick={onSignout}>
        Sign out
      </Button>
    </Container>
  );
};

export default ProfileView;
