import { serve } from "bun";
import homepage from "./example/index.html";

const projectRoot = import.meta.dir;

const roots = {
  content: projectRoot + "/content",
  style: projectRoot + "/src/style",
  assets: projectRoot + "/src/assets",
} as const;

const serveStaticFile = async (name: keyof typeof roots, relPath: string) => {
  const file = Bun.file(roots[name] + relPath);

  return file
    .exists()
    .then((found) =>
      found
        ? new Response(file)
        : new Response(`${name} ${relPath} was not found`, { status: 404 })
    );
};

/**
 * Launch the demo app in dev mode
 * with the lib served from the src/ with Hot Module Reload
 */
const server = serve({
  routes: {
    /**
     * The demo app inside example
     */
    "/": homepage,
    "/README.md": () => {
      const ressource = Bun.file(projectRoot + "/README.md");
      console.log(`Serving README.md`);
      return new Response(ressource);
    },
    /**
     * API routes to load markdown content
     */
    "/content/*": (req) =>
      serveStaticFile("content", req.url.split("/content")[1]),
    /**
     * API routes to load the themes and palettes
     */
    "/style/*": (req) => serveStaticFile("style", req.url.split("/style")[1]),
  },

  /**
   * Routes that didn't match may refer to a sattic asset
   */
  fetch: (req) => serveStaticFile("assets", new URL(req.url).pathname),

  development: true,
});

console.log(`Listening on ${server.url}`);
