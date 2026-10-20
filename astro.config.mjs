import { defineConfig } from 'astro/config';

// Vul hier het echte domein in zodra het bekend is (gebruikt voor canonical-links en sitemap).
export default defineConfig({
  site: 'https://www.frijtersafbouw.nl',
  trailingSlash: 'ignore',
});
