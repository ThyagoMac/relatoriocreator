import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar React e React DOM em um chunk
          "react-vendor": ["react", "react-dom", "react-hook-form"],
          // Separar componentes Radix UI em um chunk
          "radix-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "@radix-ui/react-tabs",
          ],
          // Outros utilitários
          utils: [
            "zod",
            "clsx",
            "tailwind-merge",
            "dexie",
            "@hookform/resolvers",
          ],
          // PDF renderer será carregado automaticamente via lazy loading
        },
      },
    },
    // Aumentar o limite de aviso para 1500 kB já que o PDF renderer é grande mas carregado via lazy loading
    chunkSizeWarningLimit: 1500,
  },
});
