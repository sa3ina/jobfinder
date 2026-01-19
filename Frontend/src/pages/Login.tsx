//@ts-nocheck
//@ts-nocheck
import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

type Props = {};

const Login = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // try each role-specific login endpoint
      const endpoints = [
        { url: `${API_URL}/jobseeker/login`, role: "jobseeker", redirect: "/" },
        { url: `${API_URL}/employer/login`, role: "employer", redirect: "/" },
        { url: `${API_URL}/admin/login`, role: "admin", redirect: "/admin" },
      ];

      let success = false;

      for (const endpoint of endpoints) {
        if (success) break;
        try {
          const response = await axios.post(endpoint.url, {
            email: values.email,
            password: values.password,
          });
          const { user, token } = response.data;
          localStorage.setItem("login", JSON.stringify(user));
          localStorage.setItem("userRole", endpoint.role);
          localStorage.setItem("authToken", token);
          await navigate(endpoint.redirect);
          window.location.reload();
          success = true;
        } catch (err) {
          // ignore and try next endpoint
        }
      }

      if (!success) {
        enqueueSnackbar("Incorrect email or password. Please try again", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Login failed. Please try again later.", {
        variant: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Password is required"),
  });
  return (
    <div className="login">
      <p className="log">Log in</p>
      <p className="please">Please fill your email and password to login</p>
      <div className="form">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <div className="cont">
              <Form className="formik">
                <p className="label">Email</p>
                <Field
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
                <p className="label">Password</p>
                <Field
                  name="password"
                  className="input"
                  placeholder="Password"
                  type="password"
                />
                {/* {errors.lastName && touched.lastName ? (
                  <div>{errors.lastName}</div>
                ) : null} */}
                <button type="submit">Log In</button>
                <div className="sign">
                  <p className="dont">Don't have an account? </p>
                  <Link to="/signup" className="link">
                    <p className="normal">Sign Up</p>
                  </Link>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
