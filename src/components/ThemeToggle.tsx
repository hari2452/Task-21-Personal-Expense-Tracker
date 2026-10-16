import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={
        isDark ? "Switch to light mode" : "Switch to dark mode"
      }
      aria-pressed={isDark}
      title={isDark ? "Light Mode" : "Dark Mode"}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {isDark ? "☀️" : "🌙"}
      </span>

      <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}

export default ThemeToggle;