import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to={"/"}>Lagerhäuser</Link></li>
                <li><Link to={"/product"}>Produkte</Link></li>
                <li><Link to={"/productdetails/:id"}>Produkt</Link></li>
            </ul>
        </nav>
    );
}