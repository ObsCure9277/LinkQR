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
        shadow-[3px_3px_0_white]
        sm:active:translate-x-2 sm:hover:translate-x-1 sm:active:translate-y-2 sm:hover:translate-y-1 sm:hover:shadow-none
        active:translate-x-0 hover:translate-x-0 active:translate-y-0 hover:translate-y-0 hover:shadow-[3px_3px_0_white]`
      }
      aria-label="Toggle dark mode"
    >
      {dark
        ? <FaMoon color="white" />
        : <FaSun color="black" />}
    </button>
  );
}
