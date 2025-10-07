const Header = ({ text, className = "" }) => {
  return (
    <h1
      className={`text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800 ${className}`}
    >
      {text}
    </h1>
  );
};

export default Header;
