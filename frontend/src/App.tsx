import { Link, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Users from "./pages/Users";
import NewUser from "./pages/NewUser";
import ThemeSwitch from "./components/ThemeSwitch";
import Employees from "./pages/Employees";
import Test from "./pages/Test";
import { Toaster } from "react-hot-toast";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { v4 as uuidv4 } from "uuid";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const menu = [
  {
    id: uuidv4(),
    name: "Home",
    path: "/",
    isVisible: true,
  },
  {
    id: uuidv4(),
    name: "Users",
    path: "/users",
    isVisible: true,
  },
  {
    id: uuidv4(),
    name: "New User",
    path: "/users/new",
    isVisible: true,
  },
  {
    id: uuidv4(),
    name: "Employees",
    path: "/employees",
    isVisible: true,
  },
  {
    id: uuidv4(),
    name: "Test",
    path: "/test",
    isVisible: false,
  },
];

function App() {
  return (
    <>
      <Toaster />

      <div className="min-h-screen p-6">
        <header className="mb-6 flex items-center justify-between gap-2">
          <nav className="flex gap-4">
            {menu
              .filter((item) => item.isVisible)
              .map((item) => {
                return (
                  <Link className="text-primary" to={item.path} key={item.id}>
                    {item.name}
                  </Link>
                );
              })}
          </nav>

          <ThemeSwitch />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/new" element={<NewUser />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
