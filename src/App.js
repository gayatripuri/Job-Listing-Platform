import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AddJob from "./components/AddJob/AddJob";
import { Provider } from "./context/JobContext.jsx";
//import Jobdescription from "./components/JobdescriptionPage/Jobdescription";
import Home from "./components/Home/Home";
import JobDetails from "./components/Home/JobDetails";
import Header from "./components/Home/Header";
import EditJob from "./components/EditJob/EditJob";
import Error404 from "./components/NotFound/Error404";
function App() {
  return (
    <>
      <Provider>
        <BrowserRouter>
          <Routes>
          <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
            <Route
              path="/:id"
              element={
                <>
                  <Header />
                  <JobDetails />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />}></Route>
            <Route path="/addjob" element={<AddJob />} />
            <Route path="/editJob/:id" element={<EditJob />} />
            <Route path="/404" element={<Error404 />} />
            <Route path="*" element={<Error404 />} />
            
           
           
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
