const colors = {
  // subjects colors
  schullv1: "#87c800",
  schullv2: "#B8DE67",
  schullv3: "#D3EAA0",
  schullv4: "#EEF7DA",
  mathe1: "#44B350",
  mathe2: "#99D79F",
  mathe3: "#BCE5C0",
  mathe4: "#E6F6E8",
  deutsch1: "#2D6EC8",
  deutsch2: "#82A9DE",
  deutsch3: "#B1C9EA",
  deutsch4: "#E1EAF7",
  englisch1: "#FA7D19",
  englisch2: "#FCB276",
  englisch3: "#FDCFAA",
  englisch4: "#FEECDE",
  franzoesisch1: "#DB2416",
  franzoesisch2: "#F1A5A0",
  franzoesisch3: "#F8D1CE",
  franzoesisch4: "#FBE7E6",
  französisch1: "#DB2416",
  französisch2: "#F1A5A0",
  französisch3: "#F8D1CE",
  französisch4: "#FBE7E6",
  bio1: "#A0321E",
  bio2: "#C68579",
  bio3: "#DCB3AB",
  bio4: "#F1E1DE",
  chemie1: "#0096C8",
  chemie2: "#67C0DE",
  chemie3: "#A0D8EA",
  chemie4: "#DAEFF7",
  physik1: "#287882",
  physik2: "#7FAEB4",
  physik3: "#AFCDD0",
  physik4: "#DFEBEC",
  geschichte1: "#663E86",
  geschichte2: "#A38BB6",
  geschichte3: "#C9BBD5",
  geschichte4: "#E8E2ED",
  blackCustom: "#001318",
  geo1: "#62A98E",
  geo2: "#8FC2AE",
  geo3: "#B1D4C6",
  geo4: "#DDEDE7",
  technik1: "#0F8975",
  technik2: "#57AC9E",
  technik3: "#9FD0C8",
  technik4: "#E7F3F1",
  aes1: "#9494FF",
  aes2: "#B3B3FF",
  aes3: "#C9C9FF",
  aes4: "#E0E0FF",

  // primary colors
  tintColor: "#87c800",
  tintColorHover: "#80BD00",
  secondaryTintColor: "#EEF7DA",
  secondaryTintColorHover: "#EAF5D0",
  black: "#000000",

  grey1: "#333333",
  grey2: "#5a5a5a",
  grey3: "#878787",
  grey4: "#cdcdcd",
  grey5: "#dadada",
  grey6: "#dfdfdf",
  grey7: "#f3f3f3",
  grey8: "#f8f8f8",

  white: "#ffffff",

  error: "#D63447",
};

const getColor = (subjectName, number, opacity = "FF") => {
  if (subjectName)
    return (
      colors[
        subjectName
          .toLowerCase()
          .replace(" leistungsfach", "")
          .replace(" basisfach", "")
          .replace(" (abi 2024)", "")
          .replace(" (bis abi 2023)", "")
          .replace(" lf", "")
          .replace(" bf", "") + number
      ] + opacity
    );
};

const getFont = (family, weight) => {
  const fontFamily = `${family}-${weight}`;
  return `${fontFamily}, Arial, Helvetica, sans-serif`;
};

const typography = {
  fontFamily: {
    regular: getFont("Roboto", "Regular"),
    bold: getFont("Roboto", "Bold"),
    medium: getFont("Roboto", "Medium"),
  },
  fontSize: {
    xxxl: "2.5rem", // 40px
    xxl: "2rem", // 32px
    xl: "1.5rem", // 24px
    l: "1.25rem", // 20px
    m: "1rem", // 16px
    s: "0.875rem", // 14px
    xs: "0.75rem", // 12px
    xxs: "0.625rem", // 10px
    xxxs: "0.5rem", // 8px
  },
};

const spacing = {
  xxxxl: "6.75rem", // 108px
  xxxl: "3.75rem", // 60px
  xxl: "3rem", // 48px
  xl: "2rem", // 32px
  l: "1.5rem", // 24px
  m: "1.25rem", // 20px
  s: "1rem", // 16px
  xs: "0.625rem", // 10px
  xxs: "0.5rem", // 8px
  xxxs: "0.3125rem", // 5px
};

const columnWidth = {
  xxxxl: "2.25",
  xxxl: "2",
  xxl: "1.75",
  xl: "1.5",
  l: "1.25",
  m: "1",
  s: "0.75",
  xs: "0.5",
  xxs: "0.25",
  xxxs: "0.125",
};

const zIndex = {
  basis: 1000,
  sticky: 1100,
  fixed: 1200,
  tooltip: 1300,
};

const breakpoints = {
  l: {
    value: 1920,
    get query() {
      return `max-width: ${this.value}px`;
    },
    get mediaQuery() {
      return `@media (${this.query})`;
    },
  },
  m: {
    value: 1280,
    get query() {
      return `max-width: ${this.value}px`;
    },
    get mediaQuery() {
      return `@media (${this.query})`;
    },
  },
  s: {
    value: 960,
    get query() {
      return `max-width: ${this.value}px`;
    },
    get mediaQuery() {
      return `@media (${this.query})`;
    },
  },
  xs: {
    value: 600,
    get query() {
      return `max-width: ${this.value}px`;
    },
    get mediaQuery() {
      return `@media (${this.query})`;
    },
  },
};

const glow = () => {
  return `0 2px 7px 0 rgba(135,200,0,0.4)`;
};

const SchulLVTheme = {
  colors,
  typography,
  spacing,
  columnWidth,
  zIndex,
  breakpoints,
  getColor,
  glow,
};
export default SchulLVTheme;
