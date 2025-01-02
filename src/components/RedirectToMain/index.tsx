import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export default function RedirectToMain() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/dashboard" });
  }, []);

  return;
}
