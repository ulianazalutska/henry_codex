import type { Metadata } from "next";
import { BlogExperience } from "./blog-experience";

export const metadata: Metadata = {
  title: "Blog | HENRY",
  description: "Rzemiosło, materiały i inspiracje wnętrzarskie ze świata foteli i sof HENRY.",
};

export default function BlogPage() {
  return <BlogExperience />;
}
