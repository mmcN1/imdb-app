import './Header.css'

const Header = () => {
  return (
    <div>
      <span onClick={() => window.location.reload()} className="header">🎥IMBD Hub🎬</span>
    </div>
  );
};

export default Header;
