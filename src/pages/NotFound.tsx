import { Button, Container, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router";
import PATHS from "../routes/patch";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Title order={1} size="6rem" style={{ marginBottom: "1rem" }}>
        404
      </Title>
      <Text size="xl" style={{ marginBottom: "2rem" }}>
        Страница не найдена
      </Text>
      <Button size="lg" onClick={() => navigate(PATHS.step1.path)}>
        Перейти к форме
      </Button>
    </Container>
  );
}
