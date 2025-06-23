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
        <header className="bg-white border-b border-reputation-gray-200 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-reputation-blue-500 to-reputation-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                    RW
                                </span>
                            </div>
                            <h1 className="text-lg sm:text-xl font-bold text-reputation-gray-900">
                                Reputation Wallet
                            </h1>
                        </div>
                        <Badge
                            variant="outline"
                            className="text-reputation-blue-600 border-reputation-blue-200 text-xs sm:text-sm"
                        >
                            MVP Demo
                        </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
                        <div className="flex items-center space-x-2">
                            <Label
                                htmlFor="view-toggle"
                                className="text-sm font-medium text-reputation-gray-700"
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
                                className="data-[state=checked]:bg-reputation-blue-600 transition-colors duration-200"
                            />
                            <Label
                                htmlFor="view-toggle"
                                className="text-sm font-medium text-reputation-gray-700"
                            >
                                Employer
                            </Label>
                        </div>

                        <div className="text-left sm:text-right">
                            <p className="text-sm text-reputation-gray-600">
                                Welcome back,
                            </p>
                            <p className="font-semibold text-reputation-gray-900 truncate max-w-[200px]">
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
