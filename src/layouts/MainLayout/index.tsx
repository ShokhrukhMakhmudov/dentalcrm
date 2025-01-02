import { AuthContextProvider } from "../../context";
import ProtectedPage from "../../pages/protected";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export default function MainLayout() {
  return (
    <>
      <AuthContextProvider>
        <ProtectedPage>
          <Outlet />
        </ProtectedPage>
      </AuthContextProvider>
      <TanStackRouterDevtools />
    </>
  );
}
