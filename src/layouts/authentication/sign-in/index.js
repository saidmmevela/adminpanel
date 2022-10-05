/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
// import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import $ from "jquery";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { setSessionCookie } from "../../../session";

function SignIn() {
  // const [rememberMe, setRememberMe] = useState(true);

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  // const [head, setHeads] = useState([]);
  const loading = async () => {};
  const handleSubmit = async () => {
    setLoad(true);
    const log = {
      email,
      password,
    };
    if (email !== "" || password !== "") {
      $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "http://localhost:5000/api/userlogin",
        data: log,
        cache: false,
        success: (data) => {
          // const data = await response.json();
          console.log("data", data);
          if (data.data === "no user") {
            alert("Wrong email/password");
            setLoad(false);
          } else {
            console.log("data", data.data);
            const dat = data.data;
            const emails = dat.email;
            console.log("email", emails);
            alert("success login");
            setLoad(false);
            setEmail("");
            setPassword("");
            setSessionCookie({ email, status: dat.status, name: dat.full_name });
            window.location.reload();
          }
        },
        error: (xhr, status, err) => {
          alert(err);
        },
      });
    } else {
      alert("please fill all space");
      setLoad(false);
    }
    // setSessionCookie({ email:data.email });
  };
  // const fetchPost = async () => {
  //   const response = await fetch("https://homecareapiapps.herokuapp.com/api/getheader/");
  //   const data = await response.json();
  //   setHeads(data[0]);
  // };

  // useEffect(() => {
  //   fetchPost();
  // }, []);

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SuiTypography>
          </SuiBox>
          <SuiInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SuiTypography>
          </SuiBox>
          <SuiInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </SuiBox>
        {/* <SuiBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SuiTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SuiTypography>
        </SuiBox> */}
        <SuiBox mt={4} mb={1}>
          <SuiButton
            variant="gradient"
            color="info"
            onClick={load ? loading : handleSubmit}
            fullWidth
          >
            {load ? "loading" : "sign in"}
          </SuiButton>
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
}

export default SignIn;
