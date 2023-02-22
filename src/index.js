import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "@asgardeo/auth-react";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider
      config={{
        signInRedirectURL: "http://localhost:3000",
        signOutRedirectURL: "http://localhost:3000",
        clientID: "ps1U8yNAl496Uj4F9vOSKr19t1Ua",
        baseUrl: "https://api.asgardeo.io/t/erandisaorg",
        scope: ["openid", "profile", "urn:erandisaorg:getproductdetails:list", "urn:erandisaorg:getproductdetails:view"]
      }}
    >
      <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>
      <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" crossorigin></script>
      <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>
      <App />

    </AuthProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
