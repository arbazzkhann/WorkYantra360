import "./App.css";
import Employee from "./components/Employee";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ListEmployee from "./Components/ListEmployee";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
    return (
        <ThemeProvider>
        <BrowserRouter>
            <div className="app-container">
            <Header />

            <main className="app-main">
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employees" element={<ListEmployee />} />
                <Route path="/add-employee" element={<Employee />} />
                <Route path="/update-employee/:id" element={<Employee />} />
                </Routes>
            </main>

            <Footer />
            </div>
        </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
