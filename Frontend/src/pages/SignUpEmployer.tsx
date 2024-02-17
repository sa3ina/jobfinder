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
          // validationSchema={SignupSchema}
          onSubmit={(values) => {
            dispatch(postData(values));
            // same shape as initial values
            console.log(values);
            navigate("/login");
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <div className="cont">
              <Form className="formik" onSubmit={handleSubmit}>
                <div className="grids">
                  <div className="griditem">
                    <p className="label gridlabel">First Name</p>
                    <Field name="firstname" className="input" />
                  </div>
                  <div className="griditem">
                    <p className="label gridlabel">Last Name</p>
                    <Field name="lastname" className="input" />
                  </div>
                </div>
                <p className="label">Your email</p>
                <Field
                  name="email"
                  type="email"
                  className="input"
                  placeholder="info@gmail.com"
                />
                {/* {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null} */}{" "}
                <p className="label">Password</p>
                <Field name="password" className="input" type="password" />
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
