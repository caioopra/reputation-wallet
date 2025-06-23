import { useState } from "react";
import Header from "@/components/Header";
import FreelancerView from "@/components/FreelancerView";
import EmployerView from "@/components/EmployerView";

const Index = () => {
    const [userView, setUserView] = useState<"freelancer" | "employer">(
        "freelancer"
    );

    return (
        <div className="min-h-screen bg-reputation-gray-50 font-inter">
            <Header userView={userView} setUserView={setUserView} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="transition-all duration-300 ease-in-out">
                    {userView === "freelancer" ? (
                        <div className="animate-fade-in">
                            <FreelancerView />
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <EmployerView />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Index;
