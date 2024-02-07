import React from "react";
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
  return (
    <div className="signup">
      <p className="log">Welcome</p>
      <p className="please">Ready for the next step?</p>
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
                <img
                  src="https://images.prismic.io/adamdotai-website-v4/3bc5eacd-ca27-4f1c-9717-0dfc846cc391_welcome-to-the-team-and-onboarding-meetings-1.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&q=50&w=1350&h=900"
                  alt=""
                />
                <Link to="/signupjobseeker" className="link">
                  <button type="submit">Job seeker</button>
                </Link>
                <Link to="/signupemployer" className="link">
                  <button type="submit">Employer</button>
                </Link>

                <div className="sign">
                  <p className="dont">Have an account?</p>
                  <Link to="/login" className="link">
                    <p className="normal">Log In</p>
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

export default SignUp;
