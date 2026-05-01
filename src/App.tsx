import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { RouterProvider } from "react-router";
import router from "./routes";

function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
