import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../redux/slices/JobseekerSlice";
import { fetchDataa } from "../redux/slices/EmployerSlice";
type Props = {};

const Login = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const { employers, loading, error } = useSelector(
    (state: RootState) => state.employers
  );
  const { jobseekers } = useSelector((state: RootState) => state.jobseekers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchDataa());
  }, [dispatch]);
  const handleSubmit = (values, { setSubmitting }) => {
    let findJobseeker = jobseekers.find(
      (elem) => elem.email === values.email && elem.password === values.password
    );
    let findEmployer = employers.find(
      (elem) => elem.email === values.email && elem.password === values.password
    );

    if (findJobseeker || findEmployer) {
      if (findJobseeker) {
        localStorage.setItem("login", JSON.stringify(findJobseeker));
        localStorage.setItem("userRole", "jobseeker");
        navigate("/");
      } else if (findEmployer) {
        localStorage.setItem("login", JSON.stringify(findEmployer));
        localStorage.setItem("userRole", "employer");
        navigate("/");
      }
    } else {
      console.log("not correct login info");
    }
    setSubmitting(false);
    window.location.reload();
  };

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
            email: "",
            password: "",
          }}
          // validationSchema={SignupSchema}
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
