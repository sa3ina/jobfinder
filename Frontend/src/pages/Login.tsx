import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  return (
    <div className="login">
      <p className="log">Log in</p>
      <p className="please">Please fill your email and password to login</p>
      <div className="form">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            console.log(values);
          }}
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
                  name="lastName"
                  className="input"
                  placeholder="Password"
                />
                {errors.lastName && touched.lastName ? (
                  <div>{errors.lastName}</div>
                ) : null}
                <button type="submit">Log In</button>
                <div className="sign">
                  <p className="dont">Don't have an account? </p>
                  <Link to="/signup" className="link">
                    <p className="normal">Sign Up</p>
                  </Link>
                </div>
              </Form>{" "}
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
