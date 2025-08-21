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
      <div style={{ maxWidth: '68rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h1
            className="linkqr-title"
            style={{
              color: "#000000",
              fontWeight: 900,
              fontSize: '2rem',
              letterSpacing: '-2px',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            LinkQR
          </h1>
          <img
            src="/linkqr_favicon.svg"
            alt="LinkQR Logo"
            style={{
              width: '2.2rem',
              height: '2.2rem',
              marginLeft: '0.25rem',
              verticalAlign: 'middle',
            }}
          />
        </div>
        <span className="dark-toggle-mobile">
          <DarkModeToggle dark={dark} setDark={setDark} black={black} white={white} />
        </span>
      </div>
      <style>
        {`
          @media (max-width: 900px) {
            .linkqr-title {
              margin-left: 1.5rem !important;
            }
            .dark-toggle-mobile {
              margin-right: 1.5rem !important;
            }
          }
        `}
      </style>
    </header>
  );
}