import "./assets/css/app.scss";
import { ADMIN } from "./constants";
import AdminLayout from "./layout/AdminLayout.jsx";
import Layout from "./layout/Layout";

function App() {
  const { pathname } = window.location;

  return (
    <div className="App">
      {pathname.includes(ADMIN) ? <AdminLayout /> : <Layout />}
    </div>
  );
}

export default App;
