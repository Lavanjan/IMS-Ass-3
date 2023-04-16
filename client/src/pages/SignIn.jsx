import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn, register } from "../redux/action";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);

  const onFinish = (values) => {
    console.log({ values });
    const payload = {
      username: values.target[0].value,
      password: values.target[1].value,
    };
    values.preventDefault();
    if (!isSignUp) {
      dispatch(logIn(payload));
    } else {
      dispatch(register(payload));
    }
  };
  const onFinishFailed = (errorInfo) => {};

  return (
    <div className="login-page">
      <ToastContainer />
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src={require("../shared/login.png")} alt="Login" />
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onSubmit={onFinish}
        >
          <p className="form-title">
            {isSignUp ? "Create account" : "Welcome back"}
          </p>
          <p>Inventory Management System</p>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" type="username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" />
          </Form.Group>

          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {isSignUp ? "CREATE ACCOUNT" : "LOGIN"}
          </Button>

          <span
            style={{
              fontSize: "14px",
              cursor: "pointer",
              textDecoration: "underline",
              marginTop: "1rem",
            }}
            onClick={() => {
              setIsSignUp((prev) => !prev);
            }}
          >
            {isSignUp
              ? "Already have an account Login"
              : "Don't have an account?"}
          </span>
        </Form>
      </div>
    </div>
  );
}
