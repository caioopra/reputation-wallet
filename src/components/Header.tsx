import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface HeaderProps {
    userView: "freelancer" | "employer";
    setUserView: (view: "freelancer" | "employer") => void;
}

const Header = ({ userView, setUserView }: HeaderProps) => {
    const userName =
        userView === "freelancer" ? "Ana Carolina" : "Innovate Corp";

    return (
        <header className="bg-reputation-gray-800 border-b border-reputation-gray-700 shadow-lg animate-slide-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4 animate-slide-in-right">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-reputation-blue-500 to-reputation-blue-600 rounded-lg flex items-center justify-center animate-glow">
                                <span className="text-white font-bold text-sm">
                                    RW
                                </span>
                            </div>
                            <h1 className="text-lg sm:text-xl font-bold text-reputation-gray-100">
                                Reputation Wallet
                            </h1>
                        </div>
                        <Badge
                            variant="outline"
                            className="text-reputation-blue-400 border-reputation-blue-600 text-xs sm:text-sm hover-lift"
                        >
                            MVP Demo
                        </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto animate-slide-in-right">
                        <div className="flex items-center space-x-2">
                            <Label
                                htmlFor="view-toggle"
                                className="text-sm font-medium text-reputation-gray-300"
                            >
                                Freelancer
                            </Label>
                            <Switch
                                id="view-toggle"
                                checked={userView === "employer"}
                                onCheckedChange={(checked) =>
                                    setUserView(
                                        checked ? "employer" : "freelancer"
                                    )
                                }
                                className="data-[state=checked]:bg-reputation-blue-600 transition-all duration-300 hover:scale-105"
                            />
                            <Label
                                htmlFor="view-toggle"
                                className="text-sm font-medium text-reputation-gray-300"
                            >
                                Employer
                            </Label>
                        </div>

                        <div className="text-left sm:text-right">
                            <p className="text-sm text-reputation-gray-400">
                                Welcome back,
                            </p>
                            <p className="font-semibold text-reputation-gray-100 truncate max-w-[200px]">
                                {userName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
