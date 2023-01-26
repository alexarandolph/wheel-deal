import { Link, NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="/technicians/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Manufacturers</NavLink>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" aria-current="page" to="/manufacturers/">
                    Manufacturers
                  </NavLink>
                  <NavLink className="dropdown-item" aria-current="page" to="/manufacturers/new/">
                    Create a manufacturer
                  </NavLink>
                </div>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="/services/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Service</NavLink>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" aria-current="page" to="/services/new/">
                    Schedule Service
                  </NavLink>
                  <NavLink className="dropdown-item" aria-current="page" to="/services/">
                    Appointments List
                  </NavLink>
                  <NavLink className="dropdown-item" aria-current="page" to="/services/search/">
                    Service History
                  </NavLink>
              </div>
            </li>
            <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="/vehicles/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Vehicles</NavLink>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <NavLink className="dropdown-item" aria-current="page" to="/vehicles/">
                      Vehicle models
                    </NavLink>
                  </div>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="/technicians/new/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Technicians</NavLink>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" aria-current="page" to="/technicians/new/">
                    New Technician
                  </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
