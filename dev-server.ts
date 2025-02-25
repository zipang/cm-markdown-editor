import { serve, type BunRequest } from "bun";
import homepage from "./example/index.html";

const projectRoot = import.meta.dir;
const contentDir = projectRoot + "/content";
const styleDir = projectRoot + "/src/style";

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
    "/content/*": (req: BunRequest) => {
      const ressourcePath = contentDir + req.url.split("/content")[1];
      console.log(`GET content`, ressourcePath);
      const ressource = Bun.file(ressourcePath);
      return new Response(ressource);
    },
    /**
     * API routes to load the themes and palettes
     */
    "/style/*": (req: BunRequest) => {
      const ressourcePath = styleDir + req.url.split("/style")[1];
      console.log(`GET stylesheet`, ressourcePath);
      const ressource = Bun.file(ressourcePath);
      return new Response(ressource);
    },
  },

  development: true,
});

console.log(`Listening on ${server.url}`);
