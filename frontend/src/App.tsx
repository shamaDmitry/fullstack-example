import { Link, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Users from "./pages/Users";
import NewUser from "./pages/NewUser";
import ThemeSwitch from "./components/ThemeSwitch";
import Employees from "./pages/Employees";

function App() {
  return (
    <>
      <div className="min-h-screen p-6">
        <header className="mb-6 flex items-center justify-between gap-2">
          <nav className="flex gap-4">
            <Link className="text-blue-600" to="/">
              Home
            </Link>

            <Link className="text-blue-600" to="/users">
              Users
            </Link>

            <Link className="text-blue-600" to="/users/new">
              New User
            </Link>

            <Link className="text-blue-600" to="/employees">
              Employees
            </Link>
          </nav>

          <ThemeSwitch />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/new" element={<NewUser />} />
            <Route path="/employees" element={<Employees />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
