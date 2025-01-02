import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import NotFound from "../pages/notFound";
import MainLayout from "../layouts/MainLayout";
import RedirectToMain from "../components/RedirectToMain";
import Services from "../pages/services";
import Patients from "../pages/patients";

const rootRoute = createRootRoute({
  component: MainLayout,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: RedirectToMain,
});

const DashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardLayout,
});

const NotFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
});

const NotFoundDashboardRoute = createRoute({
  getParentRoute: () => DashboardRoute,
  path: "*",
  component: NotFound,
});

const DashboardMainRoute = createRoute({
  getParentRoute: () => DashboardRoute,
  path: "/",
  component: Dashboard,
});

const ServicesRoute = createRoute({
  getParentRoute: () => DashboardRoute,
  path: "/services",
  component: Services,
});

const PatientsRoute = createRoute({
  getParentRoute: () => DashboardRoute,
  path: "/patients",
  component: Patients,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute,
  DashboardRoute,
  ServicesRoute,
  PatientsRoute,
  DashboardMainRoute,
  NotFoundRoute,
  NotFoundDashboardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function TanStackRouterProvider() {
  return <RouterProvider router={router} />;
}
