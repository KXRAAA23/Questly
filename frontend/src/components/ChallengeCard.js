import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import API from "../services/api";
import { useAuth } from "../contexts/AuthContext";

function ChallengeCard({ challenge, completedIds, setCompletedIds }) {
  const { token } = useAuth();

  const isCompleted = completedIds.includes(challenge._id);

  const handleComplete = async () => {
    try {
      const res = await API.post(
        "/users/complete-challenge",
        { challengeId: challenge._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCompletedIds((prev) => [...prev, challenge._id]);
      alert(`Completed! Your score is now ${res.data.score}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to complete challenge");
    }
  };

  const difficultyVariant =
    challenge.difficulty === "Easy"
      ? "success"
      : challenge.difficulty === "Medium"
      ? "warning"
      : "danger";

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{challenge.title}</Card.Title>
        <Card.Text>{challenge.description}</Card.Text>
        <div className="mb-2">
          <Badge bg={difficultyVariant} className="me-2">
            {challenge.difficulty}
          </Badge>
          <Badge bg="primary">{challenge.points} pts</Badge>
        </div>
        <Button
          variant={isCompleted ? "success" : "outline-primary"}
          className="mt-auto"
          onClick={handleComplete}
          disabled={isCompleted}
        >
          {isCompleted ? "Completed" : "Mark Complete"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ChallengeCard;
