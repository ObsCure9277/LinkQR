import { FaMoon, FaSun } from 'react-icons/fa';

type DarkModeToggleProps = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  black?: string;
  white?: string;
};

export default function DarkModeToggle({ dark, setDark }: DarkModeToggleProps) {
  return (
    <button
      onClick={() => setDark((d) => !d)}
      className={`top-5 right-5 px-2 py-2 border-2 rounded-lg font-bold cursor-pointer z-[100] transition-all duration-150 
        ${dark ? 'bg-black text-white border-white' : 'bg-white text-black border-black'} 
        shadow-[3px_3px_0_white] active:translate-x-2 hover:translate-x-1 active:translate-y-2 hover:translate-y-1 hover:shadow-none`
      }
      aria-label="Toggle dark mode"
    >
      {dark
        ? <FaMoon color="white" />
        : <FaSun color="black" />}
    </button>
  );
}
