import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const initialMockReviews = [
    {
        id: 1,
        employerName: "HashMasters",
        jobTitle: "UX/UI Design for Mobile App",
        dateIssued: "May 20, 2024",
        rating: 5,
        reviewSnippet:
            "Alice was exceptional. Her designs were creative and delivered ahead of schedule.",
        skills: ["UI Design", "Figma", "Prototyping", "Communication"],
    },
    {
        id: 2,
        employerName: "NextGen Solutions",
        jobTitle: "Brand Identity Development",
        dateIssued: "April 15, 2024",
        rating: 5,
        reviewSnippet:
            "Outstanding work on our brand redesign. Professional and highly creative.",
        skills: ["Brand Design", "Adobe Illustrator", "Creative Strategy"],
    },
    {
        id: 3,
        employerName: "TechFlow Inc",
        jobTitle: "Website Redesign",
        dateIssued: "March 10, 2024",
        rating: 4,
        reviewSnippet:
            "Great attention to detail and user experience. Delivered quality work on time.",
        skills: ["Web Design", "Responsive Design", "User Research"],
    },
    {
        id: 4,
        employerName: "StartupX",
        jobTitle: "Logo and Marketing Materials",
        dateIssued: "February 22, 2024",
        rating: 5,
        reviewSnippet:
            "Amazing creativity and professional communication throughout the project.",
        skills: ["Logo Design", "Print Design", "Adobe Creative Suite"],
    },
    {
        id: 5,
        employerName: "Global Dynamics",
        jobTitle: "App Interface Design",
        dateIssued: "January 18, 2024",
        rating: 5,
        reviewSnippet:
            "Exceeded expectations with innovative design solutions and timely delivery.",
        skills: ["Mobile UI", "Design Systems", "User Testing"],
    },
];

const FreelancerView = () => {
    const [selectedReview, setSelectedReview] = useState<
        (typeof initialMockReviews)[0] | null
    >(null);
    const [mockReviews, setMockReviews] = useState(initialMockReviews);
    const { toast } = useToast();

    useEffect(() => {
        const handleNewReview = (event: CustomEvent) => {
            const { employerName, jobTitle, rating, review, skills } =
                event.detail;

            const newReview = {
                id: Date.now(),
                employerName,
                jobTitle,
                dateIssued: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
                rating,
                reviewSnippet:
                    review || "Great work and professional collaboration.",
                skills: skills || [],
            };

            setMockReviews((prev) => [newReview, ...prev]);
        };

        window.addEventListener("newReview", handleNewReview as EventListener);
        return () =>
            window.removeEventListener(
                "newReview",
                handleNewReview as EventListener
            );
    }, []);

    const averageRating =
        mockReviews.reduce((sum, review) => sum + review.rating, 0) /
        mockReviews.length;
    const totalJobs = 32 + (mockReviews.length - initialMockReviews.length);

    const handleShareProfile = () => {
        navigator.clipboard.writeText("https://trustfolio.dev/p/alice");
        toast({
            title: "Link copied!",
            description:
                "Your shareable reputation profile link has been copied to clipboard.",
        });
    };

    const StarIcon = ({ filled }: { filled: boolean }) => (
        <svg
            className={`w-4 h-4 ${
                filled
                    ? "fill-amber-400 text-amber-400"
                    : "text-reputation-gray-300"
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );

    const UserIcon = () => (
        <svg
            className="w-4 h-4 text-reputation-gray-400"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
    );

    const CalendarIcon = () => (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
        </svg>
    );

    const ExternalLinkIcon = () => (
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
        </svg>
    );

    const CopyIcon = () => (
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
        </svg>
    );

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} filled={i < rating} />
        ));
    };

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Reputation Snapshot */}
            <Card className="bg-gradient-to-br from-reputation-blue-50 to-white border-reputation-blue-200">
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-reputation-gray-900">
                        Your Reputation Snapshot
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="text-center space-y-2">
                            <div className="flex items-center justify-center space-x-1">
                                {renderStars(Math.floor(averageRating))}
                                <span className="ml-2 text-xl sm:text-2xl font-bold text-reputation-gray-900">
                                    {averageRating.toFixed(1)}
                                </span>
                                <span className="text-reputation-gray-600">
                                    / 5.0
                                </span>
                            </div>
                            <p className="text-xl text-reputation-gray-700">
                                Overall Rating
                            </p>
                        </div>

                        <div className="text-center space-y-2">
                            <p className="text-2xl sm:text-3xl font-bold text-reputation-blue-600">
                                {totalJobs}
                            </p>
                            <p className="text-xl text-reputation-gray-700">
                                Total Jobs Completed
                            </p>
                        </div>

                        <div className="text-center space-y-2">
                            <p className="text-2xl sm:text-3xl font-bold text-reputation-blue-600">
                                {mockReviews.length}
                            </p>
                            <p className="text-xl text-reputation-gray-700">
                                Verifiable Reviews
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center pt-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    size="lg"
                                    className="bg-reputation-blue-600 hover:bg-reputation-blue-700 transition-colors duration-200"
                                >
                                    <ExternalLinkIcon />
                                    Share My Profile
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md sm:max-w-lg">
                                <DialogHeader>
                                    <DialogTitle>
                                        Share Your Reputation Profile
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <p className="text-reputation-gray-600">
                                        Your shareable reputation profile link
                                        is:
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 p-3 bg-reputation-gray-50 rounded-lg">
                                        <code className="flex-1 text-sm break-all">
                                            https://trustfolio.dev/p/alice
                                        </code>
                                        <Button
                                            size="sm"
                                            onClick={handleShareProfile}
                                            className="transition-colors duration-200"
                                        >
                                            <CopyIcon />
                                            Copy
                                        </Button>
                                    </div>
                                    <p className="text-sm text-reputation-gray-500">
                                        Share this link with potential clients
                                        to showcase your verified work history.
                                    </p>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>

            <div className="border-t border-reputation-gray-600 my-6"></div>

            {/* My Verifiable Reviews */}
            <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-reputation-blue-200">
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl font-bold text-reputation-white-900">
                        My Verifiable Reviews
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {mockReviews.map((review) => (
                            <Card
                                key={review.id}
                                className="border-reputation-gray-200 hover:shadow-md transition-shadow duration-200"
                            >
                                <CardContent className="p-4 sm:p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                                        <div className="space-y-3 flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <UserIcon />
                                                    <span className="font-semibold text-reputation-white-900">
                                                        {review.employerName}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="font-medium text-reputation-white-900 mb-1">
                                                    {review.jobTitle}
                                                </h3>
                                                <div className="flex items-center space-x-2 text-sm text-reputation-white-600">
                                                    <CalendarIcon />
                                                    <span>
                                                        {review.dateIssued}
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-reputation-white-700 italic text-sm sm:text-base leading-relaxed">
                                                "{review.reviewSnippet}"
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {review.skills.map((skill) => (
                                                    <Badge
                                                        key={skill}
                                                        variant="secondary"
                                                        className="bg-blue-100 text-blue-800 text-xs"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="lg:ml-4">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            setSelectedReview(
                                                                review
                                                            )
                                                        }
                                                        className="w-full lg:w-auto transition-colors duration-200 text-base sm:text-lg px-4 py-2"
                                                    >
                                                        View Credential
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-md sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Verifiable
                                                            Credential
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    {selectedReview && (
                                                        <div className="space-y-6">
                                                            <div className="border-2 border-reputation-blue-200 rounded-lg p-4 sm:p-6 bg-gradient-to-br from-reputation-blue-50 to-white">
                                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
                                                                    <Badge className="bg-green-100 text-green-800 w-fit">
                                                                        Verified
                                                                    </Badge>
                                                                    <span className="text-sm text-reputation-white-600">
                                                                        Credential
                                                                        #
                                                                        {selectedReview.id
                                                                            .toString()
                                                                            .padStart(
                                                                                6,
                                                                                "0"
                                                                            )}
                                                                    </span>
                                                                </div>

                                                                <h3 className="text-lg sm:text-xl font-bold text-reputation-gray-900 mb-4">
                                                                    {
                                                                        selectedReview.jobTitle
                                                                    }
                                                                </h3>

                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                                                    <div>
                                                                        <p className="text-sm text-reputation-gray-600">
                                                                            Issued
                                                                            by
                                                                        </p>
                                                                        <p className="font-semibold">
                                                                            {
                                                                                selectedReview.employerName
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm text-reputation-gray-600">
                                                                            Date
                                                                            Issued
                                                                        </p>
                                                                        <p className="font-semibold">
                                                                            {
                                                                                selectedReview.dateIssued
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <p className="text-sm text-reputation-gray-600 mb-1">
                                                                        Rating
                                                                    </p>
                                                                    <div className="flex items-center space-x-1">
                                                                        {renderStars(
                                                                            selectedReview.rating
                                                                        )}
                                                                        <span className="ml-2 font-semibold">
                                                                            {
                                                                                selectedReview.rating
                                                                            }
                                                                            /5
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <p className="text-sm text-reputation-gray-600 mb-1">
                                                                        Review
                                                                    </p>
                                                                    <p className="text-reputation-gray-900 italic">
                                                                        "
                                                                        {
                                                                            selectedReview.reviewSnippet
                                                                        }
                                                                        "
                                                                    </p>
                                                                </div>

                                                                <div>
                                                                    <p className="text-sm text-reputation-gray-600 mb-2">
                                                                        Skills
                                                                        Verified
                                                                    </p>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {selectedReview.skills.map(
                                                                            (
                                                                                skill
                                                                            ) => (
                                                                                <Badge
                                                                                    key={
                                                                                        skill
                                                                                    }
                                                                                    className="bg-reputation-blue-100 text-reputation-blue-800"
                                                                                >
                                                                                    {
                                                                                        skill
                                                                                    }
                                                                                </Badge>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div className="mt-6 pt-4 border-t border-reputation-gray-200">
                                                                    <p className="text-xs text-reputation-gray-500 break-all">
                                                                        This
                                                                        credential
                                                                        is
                                                                        cryptographically
                                                                        signed
                                                                        and
                                                                        verifiable
                                                                        on the
                                                                        blockchain.
                                                                        Credential
                                                                        hash:
                                                                        0x7a9b2c4d8e1f3a5b6c9d2e4f7a8b1c3d4e5f6a7b8c9d
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FreelancerView;
