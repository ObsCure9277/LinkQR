import { FaMoon, FaSun } from 'react-icons/fa';

export default function DarkModeToggle({ dark, setDark, black, white }) {
  return (
    <button
      onClick={() => setDark((d) => !d)}
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        padding: '1rem 1rem',
        border: `2px solid ${black}`,
        borderRadius: '8px',
        background: dark ? white : white,
        color: dark ? white : black,
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: `4px 4px 0 ${black}`,
        zIndex: 100,
      }}
      aria-label="Toggle dark mode"
    >
      {dark
        ? <FaMoon style={{ color: black }} />
        : <FaSun style={{ color: black }} />}
    </button>
  );
}
