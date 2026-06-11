"use client";

import { useSearchParams } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";

export default function ProyectoClient() {
  const sp = useSearchParams();
  const slug = sp.get("p") ?? "";
  return <ProjectDetail initial={null} slug={slug} />;
}
