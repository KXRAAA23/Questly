import React, { useEffect, useState } from "react";
import { Container, Spinner, Card, Row, Col, Table } from "react-bootstrap";
import API from "../services/api";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await API.get("/leaderboard");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <Spinner animation="border" />;

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);

  const podiumColors = ["gold", "silver", "#cd7f32"]; // 1st, 2nd, 3rd

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Leaderboard</h2>

      {/* Podium for top 3 */}
      <Row className="justify-content-center mb-4">
        {top3.map((u, index) => (
          <Col key={u._id} xs={4} className="text-center">
            <Card
              className="shadow-sm"
              style={{
                backgroundColor: podiumColors[index],
                color: "white",
                height: `${150 - index * 20}px`, // tallest for 1st place
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Card.Body>
                <Card.Title>{u.username}</Card.Title>
                <Card.Text>{u.score} pts</Card.Text>
                <Card.Subtitle>{index + 1}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Table for rest */}
      {rest.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {rest.map((u, index) => (
              <tr key={u._id}>
                <td>{index + 4}</td> {/* +4 because top3 are in podium */}
                <td>{u.username}</td>
                <td>{u.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Leaderboard;
