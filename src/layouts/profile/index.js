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

// @mui material components
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// // @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";
import { useState, useEffect } from "react";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
// import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
// import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// import PlaceholderCard from "examples/Cards/PlaceholderCard";
// react-router-dom components

// Soft UI Dashboard React components
// import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

// Overview page components
import Header from "layouts/profile/components/Header";
import $ from "jquery";
import { getSessionCookie } from "../../session";
// import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
// import profilesListData from "layouts/profile/data/profilesListData";

// Images
// import homeDecor1 from "assets/images/home-decor-1.jpg";
// import homeDecor2 from "assets/images/home-decor-2.jpg";
// import homeDecor3 from "assets/images/home-decor-3.jpg";
// import team1 from "assets/images/team-1.jpg";
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

function Overview() {
  const [fullname, setFullname] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [load, setLoad] = useState(false);
  // const stats = ["Doctor","Patient"];
  // const [head, setHeads] = useState([]);
  const loading = async () => {};
  const getuser = async () => {
    // const email = getSessionCookie().email;
    const log = {
      email: getSessionCookie().email,
    };
    $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "https://bizzynapp.herokuapp.com/api/getuser",
      data: log,
      cache: false,
      success: (data) => {
        // const data = await response.json();
        console.log("data", data);
        if (data.data === "no user") {
          // alert("Wrong email/password");
          // setLoad(false);
        } else {
          console.log("datafetch", data.data);
          const dat = data.data;
          setFullname(dat[0].full_name);
          setPhoneNo(dat[0].phone_no);
          // alert("success login");
        }
      },
      error: (xhr, status, err) => {
        // alert(err);
        console.log("err", err);
      },
    });
  };
  const handleSubmit = async () => {
    setLoad(true);
    const log = {
      full_name: fullname,
      phone_no: phoneNo,
      email: getSessionCookie().email,
    };
    console.log("data", log);
    if (fullname !== "" || phoneNo !== "") {
      $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "https://bizzynapp.herokuapp.com/api/Updatedoctor",
        data: log,
        cache: false,
        success: (data) => {
          // const data = await response.json();
          console.log("data", data);
          if (data.data === "User Already Exist") {
            alert("Email Already used by another user");
            setLoad(false);
          } else {
            alert("success update");
            setLoad(false);
          }
        },
        error: (xhr, status, err) => {
          alert(err);
        },
      });
    } else {
      alert("please fill all spaces");
      setLoad(false);
    }
  };
  useEffect(() => {
    getuser();
  }, []);
  return (
    <DashboardLayout>
      <Header />
      <Divider />
      <SuiBox mb={3}>
        <Card>
          <SuiBox p={3} mb={1} textAlign="center">
            <SuiTypography variant="h5" fontWeight="medium">
              Update Profile
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
                  type="number"
                  placeholder="Phone Number"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </SuiBox>
              <SuiBox mt={4} mb={1}>
                <SuiButton
                  variant="gradient"
                  color="dark"
                  onClick={load ? loading : handleSubmit}
                  fullWidth
                >
                  {load ? "Loading" : "update"}
                </SuiButton>
              </SuiBox>
            </SuiBox>
          </SuiBox>
        </Card>
      </SuiBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
