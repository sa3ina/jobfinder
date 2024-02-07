import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

type Props = {};

const PostJob = (props: Props) => {
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
    <div className="postjobpage">
      <p className="post">Post a Job</p>
      <p className="please">
        Handsome met debating sir dwelling age material. As style lived he worse
        dried
      </p>
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
                <p className="jobdetail">Job details</p>
                <p className="label">Your email</p>
                <Field
                  name="email"
                  type="email"
                  className="input"
                  placeholder="info@gmail.com"
                />
                {/* {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null} */}
                <p className="label">Job Title</p>
                <Field name="title" className="input" />
                <p className="label">Location</p>
                <Field
                  name="location"
                  className="input inputlocation"
                  placeholder="e.g Mumbai"
                />
                {/* {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null} */}
                <p className="leave">
                  Leave this blank if the location is not important
                </p>
                <p className="remote">Remote Position(optional)</p>
                <div className="remotecheck">
                  <Field
                    type="checkbox"
                    name="remote"
                    id="remote"
                    className="checkbox"
                  />
                  <p className="select">Select if this is a remote position.</p>
                </div>
                <div className="grids">
                  <div className="griditem">
                    <p className="label gridlabel">Job type</p>
                    <Field as="select" name="jobType" className="selectbox">
                      <option value="1">Full time</option>
                      <option value="2">Part time</option>
                      <option value="3">Internship</option>
                      <option value="4">Temporary</option>
                    </Field>
                  </div>
                  <div className="griditem">
                    <p className="label gridlabel">Job Salary (optional)</p>
                    <Field name="jobsalary" className="input" />
                  </div>
                </div>
                <div className="grids">
                  <div className="griditem">
                    <p className="label gridlabel">Job Experience</p>
                    <Field name="jobexperience" className="input" />
                  </div>
                  <div className="griditem">
                    <p className="label gridlabel">Job Qualification</p>
                    <Field name="jobqualif" className="input" />
                  </div>
                </div>
                <p className="label">Job category</p>
                <Field name="jobcategory" className="input" />
                <p className="label">Description</p>
                <Field name="description" as="textarea" className="input" />
                <p className="jobdetail">Company details</p>
                <p className="label">Company name</p>
                <Field name="companydetails" className="input" />
                <div className="grids">
                  <div className="griditem">
                    <p className="label gridlabel">Company Website</p>
                    <Field name="companywebsite" className="input" />
                  </div>
                  <div className="griditem">
                    <p className="label gridlabel">Company Email</p>
                    <Field name="companyemail" className="input" />
                  </div>
                </div>
                <div className="grids">
                  <div className="griditem">
                    <p className="label gridlabel">Company Contact</p>
                    <Field name="companycontact" className="input" />
                  </div>
                  <div className="griditem">
                    <p className="label gridlabel">Company Location</p>
                    <Field name="companylocation" className="input" />
                  </div>
                </div>
                <p className="label">Company Description</p>
                <Field name="companydesc" as="textarea" className="input" />
                <button type="submit">Submit for approval</button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PostJob;
