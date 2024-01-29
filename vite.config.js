export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    "test": "vitest --evnironment.jsdom"
  },
});
