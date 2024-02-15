import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import type { RootState } from "../redux/store";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../src/redux/slices/JobseekerSlice";
import { postData } from "../../src/redux/slices/JobseekerSlice";
import { useNavigate } from "react-router-dom";
type Props = {};

const SignUpJobSeeker = (props: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { jobseekers, loading, error } = useSelector(
    (state: RootState) => state.jobseekers
  );
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchData());
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
  const [inputs, setInputs] = useState([""]);

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const removeInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };
  const handleSubmit = (values) => {
    const formData = {
      ...values,
      desiredjob: inputs.filter((input) => input.trim() !== ""),
    };
    dispatch(postData(formData));
    navigate("/login");
  };

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
            education: "",
            desiredjob: [],
            city: "",
            jobpreference: "",
            remote: false,
            about: "",
            experience: "",
            password: "",
            cv: "",
          }}
          onSubmit={handleSubmit}
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
                <p className="label ">Education</p>
                <Field name="education" className="input" />
                <p className="label">Desired job titles</p>
                {inputs.map((input, index) => (
                  <div key={index} className="jobtitles">
                    <Field
                      name="desiredjob"
                      className="input title"
                      value={input}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder="e.g Cashier, cook, nurse"
                    />
                    {index === inputs.length - 1 && ( // Show + button for the last input
                      <button type="button" className="add" onClick={addInput}>
                        +
                      </button>
                    )}
                    {inputs.length > 1 && ( // Show - button for all inputs except the first one
                      <button
                        type="button"
                        className="add"
                        onClick={() => removeInput(index)}
                      >
                        -
                      </button>
                    )}
                  </div>
                ))}
                <p className="label">City, State</p>
                <Field
                  name="city"
                  className="input inputlocation"
                  placeholder="e.g Mumbai"
                />
                <div className="remotecheck">
                  <Field
                    type="checkbox"
                    name="remote"
                    id="remote"
                    className="checkbox"
                  />
                  <p className="select">I'm interested in remote work</p>
                </div>
                <p className="label">Job preferences</p>
                <Field as="select" name="jobpreference" className="selectbox">
                  <option value="Full time">Full time</option>
                  <option value="Part time">Part time</option>
                  <option value="Internship">Internship</option>
                  <option value="Temporary">Temporary</option>
                </Field>
                <p className="label">About skills, personal interests</p>
                <Field name="about" as="textarea" className="input" />
                <p className="label">Work experience</p>
                <Field name="experience" as="textarea" className="input" />
                <p className="label">Password</p>
                <Field name="password" className="input" />
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

export default SignUpJobSeeker;
