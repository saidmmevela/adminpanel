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
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// import Socials from "layouts/authentication/components/Socials";
// import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

function SignUp() {
  const [patient, setPatient] = useState(true);
  const [doctor, setDoctor] = useState(false);

  const handleSetAgremment = () => {
    setPatient(!patient);
    setDoctor(!doctor);
  };

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  // const stats = ["Doctor","Patient"];
  // const [head, setHeads] = useState([]);
  const handleSubmit = async () => {
    const log = {
      full_name: fullname,
      phone_no: phoneNo,
      status: patient ? "patient" : "doctor",
      email,
      password,
    };
    const response = await fetch("https://bizzynapp.herokuapp.com/api/registeruser", {
      method: "POST",
      body: JSON.stringify(log),
    });
    const data = await response.json();
    console.log("data", data);
  };

  return (
    <BasicLayout
      title="Welcome!"
      // description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SuiBox p={3} mb={1} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            Register
          </SuiTypography>
        </SuiBox>
        {/* <SuiBox mb={2}>
          <Socials />
        </SuiBox> */}
        {/* <Separator /> */}
        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiInput
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type="number"
                placeholder="Phone Number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </SuiBox>
            <SuiBox display="flex" alignItems="center">
              <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                SignUp as
              </SuiTypography>
            </SuiBox>
            <SuiBox display="flex" alignItems="center">
              <Checkbox checked={doctor} onChange={handleSetAgremment} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;Doctor&nbsp;
              </SuiTypography>
            </SuiBox>
            <SuiBox display="flex" alignItems="center">
              <Checkbox checked={patient} onChange={handleSetAgremment} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;Patient&nbsp;
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton variant="gradient" color="dark" onClick={handleSubmit} fullWidth>
                sign up
              </SuiButton>
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
              <SuiTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SuiTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
