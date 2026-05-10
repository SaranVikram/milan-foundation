/** @type {import('tailwindcss').Config} */
const theme = require("./src/config/theme.json");

// --- Start: Variables and functions from the old config ---
let font_base = Number(theme.fonts.font_size.base.replace("px", ""));
let font_scale = Number(theme.fonts.font_size.scale);
let h6 = font_base / font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;

let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;
if (theme.fonts.font_family.primary) {
  fontPrimary = theme.fonts.font_family.primary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontPrimaryType = theme.fonts.font_family.primary_type;
}
if (theme.fonts.font_family.secondary) {
  fontSecondary = theme.fonts.font_family.secondary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontSecondaryType = theme.fonts.font_family.secondary_type;
}

const themeFontFamily = {};
if (fontPrimary && fontPrimaryType) {
  themeFontFamily.primary = [fontPrimary, fontPrimaryType];
} else {
  // Fallback or default if not in theme.json, or adjust as needed
  themeFontFamily.primary = ["GalanoGrotesqueAlt", "sans-serif"]; 
}
if (fontSecondary && fontSecondaryType) {
  themeFontFamily.secondary = [fontSecondary, fontSecondaryType];
}
// --- End: Variables and functions from the old config ---


// --- Start: Functions from the new config ---
// Helper function to flatten color palette
function flattenColorPalette(colors: Record<string, any>): Record<string, string> {
  const result: Record<string, string> = {};
  
  const flatten = (obj: Record<string, any>, prefix = '') => {
    for (const [key, value] of Object.entries(obj)) {
      const newPrefix = prefix ? `${prefix}-${key}` : key; // Adjusted prefixing
      if (typeof value === 'string') {
        result[newPrefix] = value;
      } else if (typeof value === 'object' && value !== null) { // Check for null
        flatten(value, newPrefix);
      }
    }
  };
  
  flatten(colors);
  return result;
}

// Function to add color variables
function addVariablesForColors({ addBase, theme }: any) {
  const colors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(colors).map(([key, val]) => [`--${key}`, val])
  );
  
  addBase({
    ":root": {
      // You can add more base variables here if needed
      // "--transparent": "transparent", // Already handled by Tailwind
      // "--white": "#ffffff", // Already handled by Tailwind
      // "--black": "#000000", // Already handled by Tailwind
      ...newVars
    }
  });
}
// --- End: Functions from the new config ---


/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Using "class" as it's standard
  content: [
    // Combined and refined content paths
    "./pages/**/*.{ts,tsx}", // From new config
    "./components/**/*.{ts,tsx}", // From new config
    "./app/**/*.{ts,tsx}", // From new config (covers root app dir)
    "./src/app/**/*.{js,ts,jsx,tsx}", // From old config (covers src/app dir)
    "./src/layouts/**/*.{js,ts,jsx,tsx}", // From old config
    "./src/content/**/*.{md,mdx}", // From old config
    "./src/**/*.{ts,tsx}", // From new config (general catch-all for src)
  ],
  prefix: "", // From new config
  safelist: [{ pattern: /^swiper-/ }], // From old config
  theme: {
    screens: { // From old config
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: { // From new config (simpler, adjust if old config's padding was crucial)
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        // Colors from the old config (theme.json based)
        text: theme.colors.default.theme_color.text,
        accent: theme.colors.default.theme_color.accent,
        light: theme.colors.default.text_color.light,
        dark: theme.colors.default.text_color.dark,
        primary: theme.colors.default.theme_color.primary,
        // primary from old config (theme.json)
        // Note: This will create --primary, while the new config creates --primary-DEFAULT
        // If you want to use the HSL version for 'primary', remove or rename this one.
        // For now, I'm keeping both to show how they'd merge.
        // primary: theme.colors.default.theme_color.primary, 
        // secondary from old config (theme.json)
        secondary: theme.colors.default.theme_color.secondary,
        
        light_bg: theme.colors.default.theme_color.light_bg,
        primary_bg: theme.colors.default.theme_color.primary_bg,
        body: theme.colors.default.theme_color.body, // This might conflict with new 'background' or 'body' from darkmode
        header: theme.colors.default.theme_color.header,
        // border from old config (theme.json) - will create --border
        // The new config also defines 'border: hsl(var(--border))' which relies on a CSS var --border
        // This means the theme.json 'border' will define the CSS var --border if this is processed first by flattenColorPalette
        border: theme.colors.default.theme_color.border, 
        primary_100: theme.colors.default.theme_color.primary_100,
        primary_200: theme.colors.default.theme_color.primary_200,
        primary_300: theme.colors.default.theme_color.primary_300,
        secondary_100: theme.colors.default.theme_color.secondary_100,
        secondary_200: theme.colors.default.theme_color.secondary_200,
        secondary_300: theme.colors.default.theme_color.secondary_300,
        "theme-light": theme.colors.default.theme_color.theme_light,
        "theme-dark": theme.colors.default.theme_color.theme_dark,
        darkmode: { // From old config
          text: theme.colors.darkmode.text_color.default,
          light: theme.colors.darkmode.text_color.light,
          dark: theme.colors.darkmode.text_color.dark,
          primary: theme.colors.darkmode.theme_color.primary,
          secondary: theme.colors.darkmode.theme_color.secondary,
          body: theme.colors.darkmode.theme_color.body,
          border: theme.colors.darkmode.theme_color.border,
          "theme-light": theme.colors.darkmode.theme_color.theme_light,
          "theme-dark": theme.colors.darkmode.theme_color.theme_dark,
        },

      },
      fontSize: { // From old config
        base: font_base + "px",
        h1: h1 + "rem",
        "h1-sm": h1 * 0.8 + "rem",
        h2: "clamp(2.5rem, -1646rem + 2400vw, 4rem)", // Kept clamp from old
        "h2-sm": h2 * 0.8 + "rem",
        h3: h3 + "rem",
        "h3-sm": h3 * 0.8 + "rem",
        h4: "clamp(1.5rem, -548rem + 800vw, 2rem)", // Kept clamp from old
        h5: h5 + "rem",
        h6: h6 + "rem",
      },
      fontFamily: themeFontFamily, // From old config, using processed variables
      spacing: { // From old config
        space_m:
          "clamp(1.5rem, 0.98275862068966rem + 2.2068965517241vw, 2.5rem)",
        space_xs:
          "clamp(0.75rem, 0.62068965517241rem + 0.55172413793103vw, 1rem)",
        space_s:
          "clamp(1rem, 0.74137931034483rem + 1.1034482758621vw, 1.5rem)",
      },
      gridTemplateColumns: { // From old config
        "25/75": "1fr 3fr",
      },
      borderRadius: { // From new config
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: { // Combined
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        aurora: { // From new config
            from: { backgroundPosition: "50% 50%, 50% 50%" },
            to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
        'scrollha-verticaltop350228': {
          '0%': { transform: 'translateY(350px)' },
          '100%': { transform: 'translateY(-101%)' }
        },
        'scrollha-verticaltop3500': {
          '0%': { transform: 'translateY(350px)' },
          '100%': { transform: 'translateY(-101%)' }
        }
      },
      animation: { // Combined
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        aurora: "aurora 60s linear infinite", // From new config
        'scrollha-verticaltop350228': 'scrollha-verticaltop350228 100s linear infinite',
        'scrollha-verticaltop3500': 'scrollha-verticaltop3500 100s linear infinite'
      }
    }
  },
  plugins: [ // Combined
    require("@tailwindcss/typography"), // From old
    require("@tailwindcss/aspect-ratio"), // From old
    require("@tailwindcss/forms"), // From old
    require("tailwind-bootstrap-grid")({ // From old
      generateContainer: false,
      gridGutterWidth: "2rem",
      gridGutters: {
        1: "0.25rem",
        2: "0.5rem",
        3: "1rem",
        4: "1.5rem",
        5: "3rem",
      },
    }),
    require("tailwindcss-animate"), // Common, listed once
    addVariablesForColors, // From new
  ],
} satisfies Config;
