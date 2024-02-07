import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

type Props = {};

const SignUpEmployer = (props: Props) => {
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

export default SignUpEmployer;
