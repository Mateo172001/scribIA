import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FluentProvider } from "@fluentui/react-components";
import { scribIALightTheme } from "./theme/theme";

import Base from "./components/Base";
import Home from "./pages/Home";
import Compose from "./pages/FunctionsTabsPages/Compose";
import Fix from "./pages/FunctionsTabsPages/Fix";
import Resume from "./pages/FunctionsTabsPages/Resume";
import "./App.css";

function App() {
  return (
    <FluentProvider theme={scribIALightTheme}>
      <Base>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="resume" element={<Resume />} />
              <Route path="fix" element={<Fix />} />
              <Route path="compose" element={<Compose />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Base>
    </FluentProvider>
  );
}

export default App;
