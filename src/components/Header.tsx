interface HeaderProps {
    userView: "freelancer" | "employer";
    setUserView: (view: "freelancer" | "employer") => void;
  }

const Header = ({ userView, setUserView } : HeaderProps) => {
    return (
        <header className="bg-white border-b border-reputation-gray-200 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <h1>Header</h1>
            </div>
        </header>
    );
};

export default Header;
