import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "@/components/ui/toaster.tsx";
import { RouterProvider } from "react-router-dom";
import router from "@/pages/router.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <RouterProvider router={router} />
          <Toaster/>
  </StrictMode>,
)
