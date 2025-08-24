import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./providers/theme.provider";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SidebarProvider } from "./components/ui/sidebar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SidebarProvider>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />,
          {/* <SidebarTrigger/>, */}
          <Toaster />
        </ThemeProvider>
      </Provider>
    </SidebarProvider>
  </StrictMode>
);
