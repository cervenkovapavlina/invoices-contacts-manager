import { Outlet, Link } from "react-router-dom";


const Layout = ({ isAuthenticated }) => {
    // const [links, setLinks] = useState(null);
    console.log(typeof(isAuthenticated));

  const links = isAuthenticated ? [
    {"url":"/home", "name":"Home"},
    {"url":"/data", "name":"Data"},
    {"url":"/issued-invoices", "name":"Issued invoices"},
    {"url":"/logout", "name":"Logout"}]
   : [{"url":"/login", "name":"Login"}];

   console.log(links);


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">MySite</Link>
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

      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to My Bootstrap Page</h1>
          <p className="lead">This is a simple, responsive page using Bootstrap 5.</p>
        </div>
      </header>

      <main className="container my-5">
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <Outlet />
          </div>
          <div className="col-md-3" />
        </div>
      </main>

      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">&copy; 2025 MySite. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;


























