import { Outlet, Link } from "react-router-dom";

const Layout = ({ isAuthenticated }) => {
  const links = isAuthenticated ? [
    {"url":"/home", "name":"Úvodní stránka"},
    {"url":"/issued-invoices", "name":"Vydané faktury"},
    {"url":"/number-rows", "name":"Číselné řady"},
    {"url":"/logout", "name":"Odhlásit se"}]
   : [{"url":"/login", "name":"Přihlásit se"}];

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                {links.map((item) => (
                    <li className="nav-item" key={item.url}>
                        <Link className="nav-link" to={item.url}>{item.name}</Link>
                    </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>

      <header className="bg-primary text-white text-center py-4">
        <div className="container">
           <div className="app-title fs-4">Fakturos – přehledná evidence faktur a kontaktů</div>
        </div>
      </header>

      <main className="container my-5">
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10">
            <Outlet />
          </div>
          <div className="col-md-1" />
        </div>
      </main>

      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">Fakturos &copy; 2025</p>
      </footer>
    </>
  );
};

export default Layout;