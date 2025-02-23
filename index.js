import { p as C, M as L } from "./index-CxIkBce4.js";
(function() {
  const s = document.createElement("link").relList;
  if (s && s.supports && s.supports("modulepreload"))
    return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
    u(i);
  new MutationObserver((i) => {
    for (const e of i)
      if (e.type === "childList")
        for (const n of e.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && u(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function g(i) {
    const e = {};
    return i.integrity && (e.integrity = i.integrity), i.referrerPolicy && (e.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? e.credentials = "include" : i.crossOrigin === "anonymous" ? e.credentials = "omit" : e.credentials = "same-origin", e;
  }
  function u(i) {
    if (i.ep)
      return;
    i.ep = !0;
    const e = g(i);
    fetch(i.href, e);
  }
})();
var y, p;
function S() {
  if (p) return y;
  p = 1;
  function c(i) {
    if (typeof i != "string")
      throw new TypeError("Path must be a string. Received " + JSON.stringify(i));
  }
  function s(i, e) {
    for (var n = "", t = 0, o = -1, l = 0, r, a = 0; a <= i.length; ++a) {
      if (a < i.length)
        r = i.charCodeAt(a);
      else {
        if (r === 47)
          break;
        r = 47;
      }
      if (r === 47) {
        if (!(o === a - 1 || l === 1)) if (o !== a - 1 && l === 2) {
          if (n.length < 2 || t !== 2 || n.charCodeAt(n.length - 1) !== 46 || n.charCodeAt(n.length - 2) !== 46) {
            if (n.length > 2) {
              var f = n.lastIndexOf("/");
              if (f !== n.length - 1) {
                f === -1 ? (n = "", t = 0) : (n = n.slice(0, f), t = n.length - 1 - n.lastIndexOf("/")), o = a, l = 0;
                continue;
              }
            } else if (n.length === 2 || n.length === 1) {
              n = "", t = 0, o = a, l = 0;
              continue;
            }
          }
          e && (n.length > 0 ? n += "/.." : n = "..", t = 2);
        } else
          n.length > 0 ? n += "/" + i.slice(o + 1, a) : n = i.slice(o + 1, a), t = a - o - 1;
        o = a, l = 0;
      } else r === 46 && l !== -1 ? ++l : l = -1;
    }
    return n;
  }
  function g(i, e) {
    var n = e.dir || e.root, t = e.base || (e.name || "") + (e.ext || "");
    return n ? n === e.root ? n + t : n + i + t : t;
  }
  var u = {
    // path.resolve([from ...], to)
    resolve: function() {
      for (var e = "", n = !1, t, o = arguments.length - 1; o >= -1 && !n; o--) {
        var l;
        o >= 0 ? l = arguments[o] : (t === void 0 && (t = C.cwd()), l = t), c(l), l.length !== 0 && (e = l + "/" + e, n = l.charCodeAt(0) === 47);
      }
      return e = s(e, !n), n ? e.length > 0 ? "/" + e : "/" : e.length > 0 ? e : ".";
    },
    normalize: function(e) {
      if (c(e), e.length === 0) return ".";
      var n = e.charCodeAt(0) === 47, t = e.charCodeAt(e.length - 1) === 47;
      return e = s(e, !n), e.length === 0 && !n && (e = "."), e.length > 0 && t && (e += "/"), n ? "/" + e : e;
    },
    isAbsolute: function(e) {
      return c(e), e.length > 0 && e.charCodeAt(0) === 47;
    },
    join: function() {
      if (arguments.length === 0)
        return ".";
      for (var e, n = 0; n < arguments.length; ++n) {
        var t = arguments[n];
        c(t), t.length > 0 && (e === void 0 ? e = t : e += "/" + t);
      }
      return e === void 0 ? "." : u.normalize(e);
    },
    relative: function(e, n) {
      if (c(e), c(n), e === n || (e = u.resolve(e), n = u.resolve(n), e === n)) return "";
      for (var t = 1; t < e.length && e.charCodeAt(t) === 47; ++t)
        ;
      for (var o = e.length, l = o - t, r = 1; r < n.length && n.charCodeAt(r) === 47; ++r)
        ;
      for (var a = n.length, f = a - r, m = l < f ? l : f, h = -1, d = 0; d <= m; ++d) {
        if (d === m) {
          if (f > m) {
            if (n.charCodeAt(r + d) === 47)
              return n.slice(r + d + 1);
            if (d === 0)
              return n.slice(r + d);
          } else l > m && (e.charCodeAt(t + d) === 47 ? h = d : d === 0 && (h = 0));
          break;
        }
        var b = e.charCodeAt(t + d), A = n.charCodeAt(r + d);
        if (b !== A)
          break;
        b === 47 && (h = d);
      }
      var v = "";
      for (d = t + h + 1; d <= o; ++d)
        (d === o || e.charCodeAt(d) === 47) && (v.length === 0 ? v += ".." : v += "/..");
      return v.length > 0 ? v + n.slice(r + h) : (r += h, n.charCodeAt(r) === 47 && ++r, n.slice(r));
    },
    _makeLong: function(e) {
      return e;
    },
    dirname: function(e) {
      if (c(e), e.length === 0) return ".";
      for (var n = e.charCodeAt(0), t = n === 47, o = -1, l = !0, r = e.length - 1; r >= 1; --r)
        if (n = e.charCodeAt(r), n === 47) {
          if (!l) {
            o = r;
            break;
          }
        } else
          l = !1;
      return o === -1 ? t ? "/" : "." : t && o === 1 ? "//" : e.slice(0, o);
    },
    basename: function(e, n) {
      if (n !== void 0 && typeof n != "string") throw new TypeError('"ext" argument must be a string');
      c(e);
      var t = 0, o = -1, l = !0, r;
      if (n !== void 0 && n.length > 0 && n.length <= e.length) {
        if (n.length === e.length && n === e) return "";
        var a = n.length - 1, f = -1;
        for (r = e.length - 1; r >= 0; --r) {
          var m = e.charCodeAt(r);
          if (m === 47) {
            if (!l) {
              t = r + 1;
              break;
            }
          } else
            f === -1 && (l = !1, f = r + 1), a >= 0 && (m === n.charCodeAt(a) ? --a === -1 && (o = r) : (a = -1, o = f));
        }
        return t === o ? o = f : o === -1 && (o = e.length), e.slice(t, o);
      } else {
        for (r = e.length - 1; r >= 0; --r)
          if (e.charCodeAt(r) === 47) {
            if (!l) {
              t = r + 1;
              break;
            }
          } else o === -1 && (l = !1, o = r + 1);
        return o === -1 ? "" : e.slice(t, o);
      }
    },
    extname: function(e) {
      c(e);
      for (var n = -1, t = 0, o = -1, l = !0, r = 0, a = e.length - 1; a >= 0; --a) {
        var f = e.charCodeAt(a);
        if (f === 47) {
          if (!l) {
            t = a + 1;
            break;
          }
          continue;
        }
        o === -1 && (l = !1, o = a + 1), f === 46 ? n === -1 ? n = a : r !== 1 && (r = 1) : n !== -1 && (r = -1);
      }
      return n === -1 || o === -1 || // We saw a non-dot character immediately before the dot
      r === 0 || // The (right-most) trimmed path component is exactly '..'
      r === 1 && n === o - 1 && n === t + 1 ? "" : e.slice(n, o);
    },
    format: function(e) {
      if (e === null || typeof e != "object")
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
      return g("/", e);
    },
    parse: function(e) {
      c(e);
      var n = { root: "", dir: "", base: "", ext: "", name: "" };
      if (e.length === 0) return n;
      var t = e.charCodeAt(0), o = t === 47, l;
      o ? (n.root = "/", l = 1) : l = 0;
      for (var r = -1, a = 0, f = -1, m = !0, h = e.length - 1, d = 0; h >= l; --h) {
        if (t = e.charCodeAt(h), t === 47) {
          if (!m) {
            a = h + 1;
            break;
          }
          continue;
        }
        f === -1 && (m = !1, f = h + 1), t === 46 ? r === -1 ? r = h : d !== 1 && (d = 1) : r !== -1 && (d = -1);
      }
      return r === -1 || f === -1 || // We saw a non-dot character immediately before the dot
      d === 0 || // The (right-most) trimmed path component is exactly '..'
      d === 1 && r === f - 1 && r === a + 1 ? f !== -1 && (a === 0 && o ? n.base = n.name = e.slice(1, f) : n.base = n.name = e.slice(a, f)) : (a === 0 && o ? (n.name = e.slice(1, r), n.base = e.slice(1, f)) : (n.name = e.slice(a, r), n.base = e.slice(a, f)), n.ext = e.slice(r, f)), a > 0 ? n.dir = e.slice(0, a - 1) : o && (n.dir = "/"), n;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
  };
  return u.posix = u, y = u, y;
}
var w = S();
const k = "/";
function T(c = "default") {
  let s = document.getElementById("theme-loader");
  s || (s = document.createElement("link"), s.id = "theme-loader", s.rel = "stylesheet", document.head.appendChild(s));
  const g = w.resolve(k, `style/themes/${c}.css`);
  s.href = g, s.addEventListener("error", () => {
    console.error("Failed to load theme:", g);
  });
}
function E(c = "default") {
  let s = document.getElementById(
    "palette-loader"
  );
  s || (s = document.createElement("link"), s.id = "palette-loader", s.rel = "stylesheet", document.head.appendChild(s));
  const g = w.resolve(k, `style/palettes/${c}.css`);
  s.href = g, s.addEventListener("error", () => {
    console.error("Failed to load palette:", g);
  });
}
const P = (c, s = "floating-toolbar") => {
  const g = document.createElement("aside");
  g.id = s, g.style.position = "fixed";
  const u = document.createElement("button");
  u.style.backgroundColor = "white", u.style.padding = "0.5rem 2rem", u.style.fontWeight = "bold", u.style.width = "20ch", u.id = "toggle-preview", u.addEventListener("click", () => {
    u.innerText = c.mode, c.togglePreview();
  }), u.innerText = c.mode === "preview" ? "edit" : "preview", g.append(u), document.body.append(g);
}, D = {
  theme: "default",
  palette: "default",
  mode: "edit"
};
function M(c = {}) {
  const s = new URLSearchParams(window.location.search), g = { ...D, ...c };
  for (const [u, i] of s.entries())
    (u === "theme" || u === "palette") && (g[u] = i);
  return console.log("Loaded theme and palette", g), g;
}
const x = `# MARKDOWN THEMABLE EDITOR

## Tech

- [CodeMirror with a few plugins](https://codemirror.net/docs/)
- [Rehype, Remark.. for the markdown to HTML conversion](https://unifiedjs.com/)
- [Vite](https://vite.dev/)

## Features

### (almost) WISIWYG edit mode

The theming (typographic styles, colors..) are automatically applied _during_ the edition _but_.. the **Markdown** syntax tags like (\`#\`, \`##\`, etc..) are _always_ visible with some colored sugar to make them stand out.

![Rendering Screenshot](/rendering-screenshot.png)

### Markdown to HTML with advanced plugins

List of preloaded-plugins:

- [x] GFM (Github Flavored Markdown)
- [x] History (undo any edit with \`Ctrl-Z\`, redo with \`Ctrl-Y\`)
- [x] Automatic slug ids for headings (allow TOC generation)
- [x] Open external links in new window
- [x] Line breaks (force line breaks with single newline \`\\n\`)
- [x] TODO lists (like this one)
- [x] Support for inline (\`$...$\`) and block (\`$$...$$\`) $\\LaTeX$ expressions
- [x] Common keybindings + some more...
- [ ] Drop images for insertion

List of keybindings :

All the of the [standards key maps](https://codemirror.net/docs/ref/#commands.standardKeymap) plus the followings:

- \`Ctrl-b\`: Toggle **bold** selection
- \`Ctrl-i\`: Toggle _italic_ selection
- \`BackQuote\`: Toggle \`code\` selection
- \`Alt-ArrowUp\`, \`Ctrl-Shift-ArrowUp\`: Move line Up
- \`Alt-ArrowDown\`, \`Ctrl-Shift-ArrowDown\`: Move line Down
- \`Shift-Alt-ArrowUp\`: Copy line Up
- \`Shift-Alt-ArrowDown\`: Copy line Down

### Themes

Load a different theme by appending a parameter \`?theme=\` to the editor's URL.

Themes are just CSS files that override the current values of the available CSS variables:

\`\`\`css
/**
 * Root variables for theming.
 * Define global styles for typography, colors, and layout.
 */
:root {
  /* Typography */
  --font-family-serif: serif;
  --font-family-sans: sans-serif;
  --font-family-mono: monospace;
  --font-size-base: 18px;
  --line-height-base: 1.5;
  --line-height-list-item: 1.2;
  --font-weight-base: 400;
  --font-weight-heading: bold;

  /** Define the usages of the font families */
  --font-family-headings: var(--font-family-serif);
  --font-family-content: var(--font-family-serif);

  /* Block margins */
  --heading-margin-top: 1rem;
  --heading-margin-bottom: 0.5rem;
  --paragraph-margin-bottom: 0.8rem;

  /* Colors */
  --color-background-base: #f0f0f0;
  --color-page-background: white;

  --color-text-base: #222;
  --color-headings: black;
  --color-strong: var(--color-headings);
  --color-meta: darkgrey;
  --color-code-background: var(--color-background-base);
  --color-link: #14d1f1;

  /* Layout */
  --page-width: 80%;
  --page-max-width: 800px;
  --page-margin: 2rem;
  --page-padding: 3rem;

  /* CodeMirror Editor */
  --color-selection-background: yellow;
  --codemirror-active-line-background: #00000005;
}
\`\`\`

List of available themes :

- default
- natgeo
- marko
- revisions
- fruity
- recipes
- country
- dracula

### Palettes

Surcharge the theme's default color with a palette.
Load a different palette by appending a parameter \`?palette=\` to the editor's URL.

Palettes are just a subset of all the theme's variables. They contain only the colors definitions:

\`\`\`css
/**
 * Default palette
 */
:root {
  /* Colors */
  --color-background-base: #f0f0f0;
  --color-page-background: white;

  --color-text-base: #222;
  --color-headings: black;
  --color-heading-h1: var(--color-headings);
  --color-heading-h2: var(--color-headings);
  --color-heading-h3: var(--color-headings);
  --color-heading-h4: var(--color-headings);
  --color-heading-h5: var(--color-headings);
  --color-heading-h6: var(--color-headings);

  --color-strong: var(--color-headings);
  --color-meta: darkgrey;
  --color-code-background: var(--color-background-base);
  --color-link: #14d1f1;

  /* CodeMirror Editor */
  --color-selection: yellow;
  --color-active-line: #00000005;
}
\`\`\`
`, { mode: R, theme: _, palette: U } = M(), B = () => {
  try {
    T(_), E(U);
    const c = new L({ parentId: "page", doc: x, mode: R });
    P(c);
  } catch (c) {
    console.error(c);
  }
};
B();
