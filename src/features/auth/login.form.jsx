import { Formik } from "formik";
import { TextFieldFormik } from "../../components/form-controls/input/text.field.formik";
import Loader from "../../components/common/loader/loader.spinner";
import { toast } from "react-toastify";
import schema from "./loginValidations";
import PropTypes from "prop-types";

import "./login.css";

const LoginForm = (props) => {
  const { loading = false } = props;
  const initialValues = {
    username: "",
    password: "",
  };

  const onForgotPassword = (values, setFieldTouched) => {
    setFieldTouched("password", false);
    toast.dismiss();
    if (values.username) {
      props.onForgotPassord && props.onForgotPassword(values);
    } else {
      setFieldTouched("username", true, true);
    }
  };
  const onSubmit = (values) => {
    toast.dismiss();
    props.onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit,
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldTouched,
        /* and other goodies */
      }) => {
        const inputProps = {
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldTouched,
        };
        return (
          <form onSubmit={handleSubmit}>
            <div className="row mt-2">
              <div className="col">
                <TextFieldFormik
                  className="form-control"
                  name="username"
                  id="username"
                  disabled={loading}
                  placeholder="User Name or Email"
                  labelClassName="labelfield"
                  label="Username or Email"
                  {...inputProps}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <TextFieldFormik
                  className="form-control"
                  name="password"
                  id="password"
                  type="password"
                  disabled={loading}
                  placeholder="Password"
                  labelClassName="labelfield"
                  label="Password"
                  {...inputProps}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <button type="submit" id="LoginBtn" className="btn btn-primary">
                  {loading ? (
                    <Loader
                      size={32}
                      role="status"
                      className="spinner-border"
                    />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                Forgot password? Click{" "}
                <span
                  className="smallfont text-primary"
                  onClick={() => onForgotPassword(values, setFieldTouched)}
                >
                  here.
                </span>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

LoginForm.propTypes = {
  onForgotPassword: PropTypes.func,
  onSubmit: PropTypes.func,
};
export default LoginForm;
