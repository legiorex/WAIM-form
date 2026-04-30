import { defineConfig } from "orval";
export default defineConfig({
  main: {
    // hooks: {
    //   afterAllFilesWrite: "prettier --write"
    // },
    input: {
      target: `./doc.yaml`,
    },
    output: {
      client: "react-query",
      httpClient: "axios",
      mode: "tags",
      override: {
        header: true,
        mutator: {
          name: "customInstance",
          path: "./custom-instance.ts",
        },
      },
      prettier: true,
      target: "./hooks",
    },
  },
});
