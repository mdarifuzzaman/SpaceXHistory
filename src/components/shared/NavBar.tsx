import Link from "next/link";


const NavBar = (): JSX.Element => (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div className="container"> 
        <a className="navbar-brand" href="#">JSS POC</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link href="/"><a className="nav-link">Home</a></Link>
            </li>
            <li className="nav-item">
              <Link href="/spacex"><a className="nav-link">SpaceX History</a></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

export default NavBar;
