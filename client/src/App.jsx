import { useState } from "react";
import Header from "./component/Header";
import Signin from "./page/Signin";
import Home from "./page/Home";
import Footer from "./component/Footer";
import About from "./page/About";
import { Route, Routes, BrowserRouter } from "react-router-dom"; // Keep BrowserRouter here

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <BrowserRouter> {/* Move BrowserRouter here */}
                <div className="flex flex-col min-h-screen">
                    <header>
                        <Header />
                    </header>
                    <main className="flex-grow p-4">
                        {/* Define your routes */}
                        <Routes>
                            <Route path="/sign-in" element={<Signin />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;