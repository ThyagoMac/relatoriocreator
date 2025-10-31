import postcssOklabFunction from '@csstools/postcss-oklab-function';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss,
    // Converter oklch/oklab para RGB para compatibilidade com html2canvas
    postcssOklabFunction({
      preserve: false, // Remove oklch e mantém apenas RGB
    }),
    autoprefixer,
  ],
}

