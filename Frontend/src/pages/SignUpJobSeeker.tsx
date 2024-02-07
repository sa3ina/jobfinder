import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

type Props = {};

const SignUp = (props: Props) => {
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
  const [inputs, setInputs] = useState([""]); // State to manage input fields

  // Function to add more input fields
  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  // Function to handle input changes
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  // Function to remove input fields
  const removeInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic with the input values
    console.log(inputs);
  };
  return (
    <div className="signuppage">
      <p className="post">Create an account</p>
      <p className="please">Create an account and start using Jobhunt</p>
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
                <div className="grids">
                  <div className="griditem">
                    <p className="label gridlabel">First Name</p>
                    <Field name="jobexperience" className="input" />
                  </div>
                  <div className="griditem">
                    <p className="label gridlabel">Last Name</p>
                    <Field name="jobqualif" className="input" />
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
                <Field name="jobsalary" className="input" />
                <p className="label">Desired job titles</p>
                {inputs.map((input, index) => (
                  <div key={index} className="jobtitles">
                    <Field
                      name="title"
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
                  name="location"
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
                <Field as="select" name="jobType" className="selectbox">
                  <option value="1">Full time</option>
                  <option value="2">Part time</option>
                  <option value="3">Internship</option>
                  <option value="4">Temporary</option>
                </Field>
                <p className="label">About skills, personal interests</p>
                <Field name="description" as="textarea" className="input" />
                <p className="label">Work experience</p>
                <Field name="description" as="textarea" className="input" />
                <p className="label">Password</p>
                <Field name="jobcategory" className="input" />
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

export default SignUp;
