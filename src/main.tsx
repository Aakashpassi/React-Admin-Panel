import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from "./app/routerConfig"
import { AppProviders } from './app/providers'
import "./styles/globals.css";

function StartupPreloaderCleanup() {
  useEffect(() => {
    const preloader = document.getElementById("app-preloader");

    if (!preloader) return;

    // Keep the splash visible for at least 1.5 seconds
    const timer = window.setTimeout(() => {
      preloader.classList.add("is-hidden");

      // Remove it after the fade-out animation
      const removeTimer = window.setTimeout(() => {
        preloader.remove();
      }, 450);

      // Store the timer on the element so cleanup can cancel it
      preloader.dataset.removeTimer = String(removeTimer);
    }, 1500);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <StartupPreloaderCleanup />
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>
)
