import DarkModeToggle from './Toggle';

type HeaderProps = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ dark, setDark }: HeaderProps) {
  const black = dark ? '#000' : '#fff';
  const white = dark ? '#fff' : '#000';
  const blue = '#0070f3';

  return (
    <header
      style={{
        width: '100%',
        background: blue,
        borderBottom: `4px solid ${black}`,
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, Arial, sans-serif',
        zIndex: 50,
      }}
    >
      <style>
        {`
          @media (max-width: 900px) {
            .linkqr-title {
              margin-left: 1.5rem !important;
            }
          }
        `}
      </style>
      <div style={{ maxWidth: '72rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1
          className="linkqr-title"
          style={{
            color: white,
            fontWeight: 900,
            fontSize: '2rem',
            letterSpacing: '-2px',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          LinkQR
        </h1>
        <DarkModeToggle dark={dark} setDark={setDark} black={black} white={white} style={{ marginLeft: '10rem' }}/>
      </div>
    </header>
  );
}