import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Login";
  });

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        data
      );
      console.log(response.data);

      if (
        !response.data.message ||
        response.data.message !== "Login Berhasil"
      ) {
        console.log("Login failed:", response.data.message);
      } else {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username); // Tambahkan baris ini
        setIsLoggedIn(true);
        navigate("/dashboard", { replace: true });
        setUsername("");
        setPassword("");
        return;
      }
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100">
        <Col lg="5" className="mx-auto text-center">
          <Card className="bg-custom shadow border-0">
            <br></br>
            <CardHeader className="bg-transparent pb-5">
              <h2 className="login-heading text-center">Login</h2>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form" onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                  <Input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Enter username"
                    className="input-custom"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter password"
                    className="input-custom"
                  />
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="my-4 btn-custom"
                    color="primary"
                    type="submit"
                  >
                    Login
                  </Button>
                </div>
                <div className="login-options">
                  <p className="forgot-password">Lupa password?</p>
                  <p className="register-link">Not a member? Register</p>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default Login;
