import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        The page you're looking for doesn't exist.
      </p>

      <Link to={ROUTES.HOME}>
        Go to Home
      </Link>
    </div>
  );
}