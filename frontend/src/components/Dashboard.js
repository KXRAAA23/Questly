import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import API from "../services/api";
import ChallengeCard from "./ChallengeCard";
import { AuthContext } from "../contexts/AuthContext";

function Dashboard() {
  const [challenges, setChallenges] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch all challenges
        const res = await API.get("/challenges", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Pick 5 random challenges
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        setChallenges(shuffled.slice(0, 5));

        // Fetch completed challenges for today
        const userRes = await API.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const today = new Date().toDateString();
        const todayCompleted = userRes.data.completedChallenges
          .filter((c) => new Date(c.date).toDateString() === today)
          .map((c) => c.challengeId);

        setCompletedIds(todayCompleted);
      } catch (err) {
        setError("Failed to load challenges");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p>Loading challenges...</p>
      </Container>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Today's Challenges</h2>
      <Row className="g-3">
        {challenges.map((ch) => (
          <Col md={6} lg={4} key={ch._id}>
            <ChallengeCard
              challenge={ch}
              completedIds={completedIds}
              setCompletedIds={setCompletedIds}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Dashboard;
