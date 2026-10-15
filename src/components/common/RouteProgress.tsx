// import { useEffect } from "react";
// import {
//     useLocation,
//     useNavigation,
// } from "react-router-dom";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// export default function RouteProgress() {
//     const location = useLocation();
//     const navigation = useNavigation();

//     useEffect(() => {
//         if (navigation.state !== "idle") {
//             NProgress.start();
//         }
//     }, [navigation.state]);

//     useEffect(() => {
//         // A location change means the navigation completed.
//         NProgress.done();
//     }, [location.pathname, location.search, location.hash]);

//     useEffect(() => {
//         NProgress.configure({
//             showSpinner: false,
//             minimum: 0.15,
//             trickleSpeed: 150,
//         });

//         return () => {
//             NProgress.done();
//         };
//     }, []);

//     return null;
// }

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function RouteProgress() {
  const location = useLocation();

  useEffect(() => {
    NProgress.done();
  }, [location.pathname, location.search, location.hash]);

  return null;
}