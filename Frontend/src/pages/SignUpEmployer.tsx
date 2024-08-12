//@ts-nocheck
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { fetchDataa } from "../../src/redux/slices/EmployerSlice";
import { postData } from "../../src/redux/slices/EmployerSlice";
import { useNavigate } from "react-router-dom";
type Props = {};

const SignUpEmployer = (props: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { employers, loading, error } = useSelector(
    (state: RootState) => state.employers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataa());
  }, [dispatch]);
  const SignupSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Required")
      .test("unique-email", "Email already in use", (value) => {
        return !employers.some((emp) => emp.email === value);
      }),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 characters minimum.")
      .matches(/[0-9]/, "Password must contain at least one number.")
      .required("Password is required"),
  });

  return (
    <div className="signuppage">
      <p className="post">Create an account</p>
      <p className="please">Create an account and start using Jobhunt</p>
      <div className="form">
        <Formik
          initialValues={{
            id: uuidv4(),
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            notifications: [],
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            dispatch(postData(values));
            console.log(values);
            navigate("/login");
            // window.location.reload();
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <div className="cont">
              <Form className="formik" onSubmit={handleSubmit}>
                <div className="grids">
                  <div className="griditem">
                    <p className="label gridlabel">First Name</p>
                    <Field name="firstname" className="input" />
                    {errors.firstname && touched.firstname ? (
                      <div>{errors.firstname}</div>
                    ) : null}
                  </div>
                  <div className="griditem">
                    <p className="label gridlabel">Last Name</p>
                    <Field name="lastname" className="input" />
                    {errors.lastname && touched.lastname ? (
                      <div>{errors.lastname}</div>
                    ) : null}
                  </div>
                </div>
                <p className="label">Your email</p>
                <Field
                  name="email"
                  type="email"
                  className="input"
                  placeholder="info@gmail.com"
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
                <p className="label">Password</p>
                <Field name="password" className="input" type="password" />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <button type="submit" className="submit">
                  Create account
                </button>
                <div className="sign">
                  <p className="dont">Have an account?</p>
                  <Link to="/login" className="link">
                    <p className="normal">Log In</p>
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

export default SignUpEmployer;
