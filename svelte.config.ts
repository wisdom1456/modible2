import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

export default {
  kit: {
    adapter: adapter(),
    vite: {
      build: {
        sourcemap: true,
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                return id
                  .toString()
                  .split('node_modules/')[1]
                  .split('/')[0]
                  .toString();
              }
            },
          },
        },
      },
    },
  },
  preprocess: preprocess({
    typescript: true,
    postcss: true,
  }),
};
