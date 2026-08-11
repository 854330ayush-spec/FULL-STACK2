import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav>
      <h2>JWT RBAC App</h2>
      <div>
        <Link to="/dashboard">Dashboard</Link>{" "}
        <Link to="/viewer">Viewer</Link>{" "}
        {role === "admin" && <Link to="/admin">Admin</Link>}{" "}
        {(role === "admin" || role === "editor") && <Link to="/editor">Editor</Link>}
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;