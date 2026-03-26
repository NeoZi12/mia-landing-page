import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/servicesData";
import ServiceExplanationSection from "@/components/sections/ServiceExplanationSection";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceExplanationSection service={service} />;
}
