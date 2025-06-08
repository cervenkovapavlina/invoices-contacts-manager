import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav class="d-none">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/data">Data</Link>
          </li>
          <li>
            <Link to="/data2">Data2</Link>
          </li>
          <li>
            <Link to="/issued-invoices">Issued invoices</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;

























