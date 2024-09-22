  Checkbox: {
    baseStyle: () => ({
      control: {
        rounded: "md",
        _checked: { background: "blue.400", borderColor: "blue.400" },
      },
      icon: { color: "white", padding: "2px" },
    }),
  },
  Avatar: {
    baseStyle: ({ colorMode }: StyleFunctionProps) => ({
      excessLabel: {
        bg: colorMode == "light" ? "gray.200" : "gray.700",
        fontWeight: 600,
      },
    }),
  },
};

export const styles = {
  global: (props: ChakraProps) => ({
    body: {
      bg: mode("gray.50", "gray.1000")(props),
    },
  }),
};

export const breakpoints = {
  base: "0em", // 0px
  sm: "30em", // ~480px. em is a relative unit and is dependant on the font-size.
  sd: "40em", // ~640px
  md: "48em", // ~768px
  lg: "62em", // ~992px
  xl: "80em", // ~1280px
  "2xl": "96em", // ~1536px
};

export const theme = extendTheme({
  fonts,
  components,
  colors,
  config,
  styles,
  breakpoints,
}) as ChakraTheme;