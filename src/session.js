import React from "react";
import * as Cookies from "js-cookie";

export const setSessionCookie = (session) => {
  // Cookies.remove("session");
  Cookies.set("session", session, { expires: 14 });
};

export const getSessionCookie = () => {
  const sessionCookie = Cookies.get("session");

  if (sessionCookie === undefined) {
    return {};
  }
  return JSON.parse(sessionCookie);
};

export const SessionContext = React.createContext(getSessionCookie());
/*
 "install:clean": "rm -rf node_modules/ && rm -rf package-lock.json && npm install && npm start",
    "compile:scss": "node-sass --importer node_modules/node-sass-package-importer/dist/cli.js src/assets/scss/argon-dashboard-react.scss src/assets/css/argon-dashboard-react.css",
    "minify:scss": "node-sass --importer node_modules/node-sass-package-importer/dist/cli.js src/assets/scss/argon-dashboard-react.scss src/assets/css/argon-dashboard-react.min.css --output-style compressed",
    "map:scss": "node-sass --importer node_modules/node-sass-package-importer/dist/cli.js src/assets/scss/argon-dashboard-react.scss src/assets/css/argon-dashboard-react.css --source-map true",
    "build:scss": "npm run compile:scss && npm run minify:scss && npm run map:scss"
 */
