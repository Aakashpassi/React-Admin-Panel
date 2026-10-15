import { Button } from "@/components/ui/button";
import { LABELS } from "../../constants/lables";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
export default function Dashboard() {
  return (
    <div>
      <h1>{LABELS.DASHBOARD}</h1>


      <Button onClick={() => NProgress.start()}>
        Test progress bar
      </Button>
      <p>
        Welcome to your dashboard.
      </p>
    </div>
  );
}