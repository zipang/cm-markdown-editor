Bun.build({
	entrypoints: ["src/editor/", "src/utils"],
	outdir: "dist",
	target: "browser",
	format: "esm",
	sourcemap: "external",
	minify: true,
	packages: "bundle",
	external: ["react", "react-dom"],
	loader: {
		".md": "text"
	},
	splitting: true
});
