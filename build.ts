Bun.build({
  entrypoints: ["src/editor/", "src/utils"],
  outdir: "dist",
  target: "browser",
  format: "esm",
  sourcemap: "external",
  minify: false,
  packages: "bundle",
});
