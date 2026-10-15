import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    DEFAULT_THEME,
    type Theme,
} from "../../constants/theme";

const STORAGE_KEY = "app-theme";

interface ThemeContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

 const ThemeContext = createContext<ThemeContextValue | undefined>(
    undefined
);

interface ThemeProviderProps {
    children: ReactNode;
}

  const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;
        return storedTheme ?? DEFAULT_THEME;
    });

  useEffect(() => {
    const root = document.documentElement;

    // Remove previous theme
    root.removeAttribute("data-theme");

    // shadcn dark mode uses .dark
    root.classList.toggle("dark", theme === "dark");

    // Custom themes use data-theme
    if (theme !== "dark") {
      root.setAttribute("data-theme", theme);
    }

    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

    function setTheme(newTheme: Theme) {
        setThemeState(newTheme);
    }


    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );

}

export { ThemeProvider, ThemeContext };