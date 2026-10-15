import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export default function Unauthorized() {
  return (
    <div>
      <h1>403</h1>

      <h2>Unauthorized</h2>

      <p>
        You don't have permission to access this page.
      </p>

      <Link to={ROUTES.HOME}>
        Go to Home
      </Link>
    </div>
  );
}