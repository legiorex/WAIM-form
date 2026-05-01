import { Center } from "@mantine/core";
import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <Center style={{ minHeight: "100vh", padding: "2rem" }}>{children}</Center>
  );
};
