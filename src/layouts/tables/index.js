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

import { useState, useEffect } from "react";

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import SuiAvatar from "components/SuiAvatar";
import SuiBadge from "components/SuiBadge";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import Table from "examples/Tables/Table";
import $ from "jquery";

// Data
// import fullnamesTableData from "layouts/tables/data/fullnamesTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

// @mui material components
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// Images
import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";
import { getSessionCookie } from "../../session";

function Tables() {
  const [rowsa, setRosa] = useState([[]]);
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [docdata, setDoc] = useState([]);
  const [load, setLoad] = useState(false);
  // const colum = [
  //   { full_name: "fullname", phone: "left" },
  //   { full_name: "fullnames", phone: "left" },
  //   { full_name: "fullnameg", phone: "left" },
  //   { full_name: "fullnamel", phone: "left" },
  // ];
  const deleteAppoint = async (dat) => {
    console.log("id: ", dat);
    $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "https://bizzynapp.herokuapp.com/api/Removeuser",
      data: dat,
      cache: false,
      success: (data) => {
        // const data = await response.json();
        console.log("data", data);
        if (data.data === "no user") {
          // alert("Wrong email/password");
          // setLoad(false);
        } else {
          console.log("datafetch", data.data);
          setDoc(data.data);
          // const dato = data.data;
          console.log("data", docdata);
          alert("Success Delete");
          window.location.reload();
        }
      },
      error: (xhr, status, err) => {
        // alert(err);
        console.log("err", err);
      },
    });
  };
  const getdoctor = async () => {
    // const email = getSessionCookie().email;
    const log = {
      email: getSessionCookie().email,
    };
    $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "https://bizzynapp.herokuapp.com/api/userbyrole",
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
          setDoc(data.data);
          const dat = data.data;
          console.log("data", docdata);
          // alert("success login");
          setRosa([
            dat.map((dats) => ({
              fullname: (
                <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
                  <SuiBox mr={2}>
                    <SuiAvatar src={team2} alt="name" size="sm" variant="rounded" />
                  </SuiBox>
                  <SuiBox display="flex" flexDirection="column">
                    <SuiTypography variant="button" fontWeight="medium">
                      {dats.full_name}
                    </SuiTypography>
                    <SuiTypography variant="caption" color="secondary">
                      {dats.email}
                    </SuiTypography>
                  </SuiBox>
                </SuiBox>
              ),
              phone: (
                <SuiBox display="flex" flexDirection="column">
                  <SuiTypography variant="caption" fontWeight="medium" color="text">
                    {dats.phone_no}
                  </SuiTypography>
                </SuiBox>
              ),
              status:
                (getSessionCookie().status === "patient" && (
                  <SuiBadge
                    variant="gradient"
                    badgeContent={dats.status}
                    color="success"
                    size="xs"
                    container
                  />
                )) ||
                (getSessionCookie().status === "admin" && dats.status !== "admin" && (
                  <SuiButton
                    variant="gradient"
                    color="warning"
                    size="xs"
                    onClick={() => deleteAppoint(dats)}
                    // fullWidth
                  >
                    Delete
                  </SuiButton>
                )),
            })),
          ]);
        }
      },
      error: (xhr, status, err) => {
        // alert(err);
        console.log("err", err);
      },
    });
  };
  useEffect(() => {
    getdoctor();
  }, []);
  const fullnamesTableData = {
    columns: [
      { name: "fullname", align: "left" },
      { name: "phone", align: "left" },
      { name: "status", align: "center" },
    ],
  };
  // console.log("rowsa", rowsa);

  const { columns } = fullnamesTableData;
  // const { columns: prCols, rows: prRows } = projectsTableData;

  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <SuiBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="secondary"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${light.main}`}
      >
        {name.toUpperCase()}
      </SuiBox>
    );
  });

  const renderRows = rowsa[0].map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
          <SuiBox
            key={uuidv4()}
            component="td"
            p={1}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <SuiBox display="flex" alignItems="center" py={0.5} px={1}>
              <SuiBox mr={2}>
                <SuiAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
              </SuiBox>
              <SuiTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
                {row[name][1]}
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        );
      } else {
        template = (
          <SuiBox
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <SuiTypography
              variant="button"
              fontWeight="regular"
              color="secondary"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {row[name]}
            </SuiTypography>
          </SuiBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });
  // const [appoint, setAppoint] = useState(false);
  // const stats = ["Doctor","Patient"];
  // const [head, setHeads] = useState([]);
  const handleSearch = async (value) => {
    setSearch(value);
    const rowfilter = docdata;
    const newrow = [];
    rowfilter.forEach((element) => {
      if (element.full_name.toLowerCase().includes(value.toLowerCase())) {
        newrow.push(element);
      }
    });

    setRosa([
      newrow.map((dats) => ({
        fullname: (
          <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
            <SuiBox mr={2}>
              <SuiAvatar src={team2} alt="name" size="sm" variant="rounded" />
            </SuiBox>
            <SuiBox display="flex" flexDirection="column">
              <SuiTypography variant="button" fontWeight="medium">
                {dats.full_name}
              </SuiTypography>
              <SuiTypography variant="caption" color="secondary">
                {dats.email}
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        ),
        phone: (
          <SuiBox display="flex" flexDirection="column">
            <SuiTypography variant="caption" fontWeight="medium" color="text">
              {dats.phone_no}
            </SuiTypography>
          </SuiBox>
        ),
        status: (
          <SuiBadge
            variant="gradient"
            badgeContent={dats.status}
            color="success"
            size="xs"
            container
          />
        ),
      })),
    ]);
    // const big = rowfilter.filter((ro) => ro.fullname === value);
    console.log("filter", newrow);
  };
  const loading = async () => {};
  const handleSubmit = async () => {
    setLoad(true);
    const log = {
      email,
      pat: getSessionCookie().email,
      time,
      date,
    };
    console.log("data", log);
    if (time !== "" || date !== "" || email !== "") {
      $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "https://bizzynapp.herokuapp.com/api/setappointment",
        data: log,
        cache: false,
        success: (data) => {
          // const data = await response.json();
          console.log("data", data);
          if (data.data === "wrong email") {
            alert("Wrong email for the doctor");
            setLoad(false);
          } else {
            alert("success setting appointment");
            setLoad(false);
            setdate("");
            settime("");
            setEmail("");
          }
        },
        error: (xhr, statu, err) => {
          alert(err);
          setLoad(false);
        },
      });
    } else {
      alert("please fill all spaces");
      setLoad(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {getSessionCookie().status === "patient" && (
        <Card>
          <SuiBox p={3} mb={1} textAlign="center">
            <SuiTypography variant="h5" fontWeight="medium">
              Set Appoinment
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
                  type="email"
                  placeholder="Doctor Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </SuiBox>
              <SuiBox mb={2}>
                <SuiInput
                  type="time"
                  placeholder="Time"
                  value={time}
                  onChange={(e) => settime(e.target.value)}
                />
              </SuiBox>
              <SuiBox mb={2}>
                <SuiInput
                  type="date"
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setdate(e.target.value)}
                />
              </SuiBox>
              <SuiBox mt={4} mb={1}>
                <SuiButton
                  variant="gradient"
                  color="dark"
                  onClick={load ? loading : handleSubmit}
                  fullWidth
                >
                  {load ? "Loading" : "submit"}
                </SuiButton>
              </SuiBox>
            </SuiBox>
          </SuiBox>
        </Card>
      )}
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">
                {getSessionCookie().status === "patient" ? "Doctors" : "Users"}
              </SuiTypography>
            </SuiBox>
            {getSessionCookie().status === "patient" && (
              <SuiBox pr={1}>
                <SuiInput
                  placeholder="Search name..."
                  icon={{ component: "search", direction: "left" }}
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </SuiBox>
            )}
            <SuiBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <TableContainer>
                <MuiTable>
                  <SuiBox component="thead">
                    <TableRow>{renderColumns}</TableRow>
                  </SuiBox>
                  <TableBody>{renderRows}</TableBody>
                </MuiTable>
              </TableContainer>
            </SuiBox>
          </Card>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
