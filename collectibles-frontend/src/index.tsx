import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { IconContext } from "react-icons";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./context/is-authenticated";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <AuthProvider>
          <IconContext.Provider value={{}}>
            <div className="relative min-h-screen flex flex-col">
              <Header />
              <div className="flex flex-1 mt-16 bg-collectible-50">
                <App />
              </div>
              <Footer />
            </div>
          </IconContext.Provider>
        </AuthProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
