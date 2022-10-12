import { createTheme, ThemeOptions } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a70023",
    },
    action: {
      disabled: "#D4D4D4",
      disabledBackground: "#F4F4F4",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          ":disabled": {
            background: "#F4F4F4",
            color: "#D4D4D4",
          },
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
      variants: [
        {
          props: { variant: "standard" },
          style: {
            height: "48px !important",
            padding: "11px 16px",
            border: "1px solid #F2F4F6",
          },
        },
        {
          props: { variant: "text" },
          style: {
            textTransform: "capitalize",
            fontSize: "15px",
            fontWeight: "normal",
            borderRadius: 0,
            height: "max-content",
            margin: "auto 0",
            "&:hover": {
              background: "transparent",
            },
          },
        },
        {
          props: { variant: "contained" },
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 16px",
            gap: "10px",
            width: "100%",
            height: "48px",
            color: "#FFFFFF",
            borderRadius: "6px",
            letterSpacing: "0.5px",

            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "18px",
            textAlign: "center",
            textTransform: "capitalize",
            boxShadow: "none",
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "6px 16px",
            gap: "4px",
            width: "100%",
            height: "40px",
            background: "#fff",
            border: "1px solid #6939FF",
            color: "#6939FF",
            borderRadius: "20px",

            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "18px",
            textAlign: "center",
            textTransform: "capitalize",
            boxShadow: "none",
            cursor: "pointer",
          },
        },
      ],
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          "&.Mui-error": {
            ":before": {
              position: "relative",
              content: "url(../themes/icons/error.svg)",
              fontWeight: 900,
              marginRight: "5px",
              top: "1px",
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          marginLeft: "5px",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "16px",
          color: "#87849F !important",
          "&.MuiInputLabel-shrink": {
            transform: "translate(12px, 7px) scale(1) !important",
            fontSize: "13px",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          width: "100% !important",
        },
        inputRoot: {
          padding: " 0 !important",
        },
        input: {
          border: "1px solid #f2f4f6 !important",
          borderRadius: "50px",
          paddingTop: "12px !important",
          paddingBottom: "12px !important",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: "#fff",
          width: "100% !important",
          minHeight: "17px",
          borderRadius: "4px",
          boxShadow: "none",
          border: "1px solid #DEDBFA",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: "8px",
          borderRadius: "6px",
          boxShadow: "none !important",
        },
        list: {
          borderRadius: "6px",
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
          border: "1px solid #DEDBFA",
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#87849F",
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 400,
          fontSize: "14px",
          height: "48px",
          alignSelf: "stretch",
          padding: "11px 16px",
          lineHeight: "16px",
          fontFeatureSettings: "'pnum' on, 'lnum' on",
          "&:hover": {
            background: "#F8F8FA",
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          marginLeft: "-35px",
          zIndex: 2,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          position: "relative",
          paddingLeft: "16px !important",
          background: "#FFFFFF",
          border: "1px solid #DEDBFA !important",
          borderRadius: "6px",
          fontWeight: 400,
          fontSize: "15px",
          lineHeight: "16px",
          color: "#4A476F",
          height: "17px",
          transition: "all 0.4s ease",
          "&::placeholder": {
            color: "#ABA9BC !important",
          },
          "&:focus": {
            border: "1px solid #a70023 !important",
            boxShadow: "0 0 0 3px rgba(167, 0, 36, 0.02) !important",
          },
          "&:hover": {
            border: "1px solid #8C82EE ",
          },
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px rgba(167, 0, 36, 0.02) inset",
            WebkitTextFillColor: "#4A476F",
          },
        },
        root: {
          position: "relative",
          // border: "1px solid orangered",
          "&::after": {
            border: "0 !important",
          },
          "&::before": {
            border: "0 !important", // use your color
          },
          "&:hover": {
            backgroundColor: "#fff",
          },
          "&$focused": {
            backgroundColor: "#fff",
          },
        },
      },
    },
  },
} as ThemeOptions);

export default theme;
