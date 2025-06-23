import { useState } from "react";
import Header from "@/components/Header";
import FreelancerView from "@/components/FreelancerView";
import EmployerView from "@/components/EmployerView";

const Index = () => {
    const [userView, setUserView] = useState<"freelancer" | "employer">(
        "freelancer"
    );

    return (
        <div className="min-h-screen bg-reputation-gray-900 font-inter">
            <Header userView={userView} setUserView={setUserView} />
            <main className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="floating-card transition-all duration-300 ease-in-out">
                    {userView === "freelancer" ? (
                        <div className="animate-slide-up">
                            <FreelancerView />
                        </div>
                    ) : (
                        <div className="animate-slide-up">
                            <EmployerView />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Index;