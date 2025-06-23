import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { QrCode } from "lucide-react";

const mockCollaborations = [
    {
        id: 1,
        freelancerName: "Alice",
        jobTitle: "UX/UI Design for Mobile App",
        status: "review_pending" as const,
    },
    {
        id: 2,
        freelancerName: "Marcus Johnson",
        jobTitle: "Frontend Development",
        status: "review_issued" as const,
    },
    {
        id: 3,
        freelancerName: "Sarah Chen",
        jobTitle: "Content Strategy & Writing",
        status: "review_issued" as const,
    },
    {
        id: 4,
        freelancerName: "David Rodriguez",
        jobTitle: "Backend API Development",
        status: "review_pending" as const,
    },
];

const predefinedSkills = [
    "UI Design",
    "Figma",
    "Communication",
    "Prototyping",
    "User Research",
    "Problem Solving",
    "Creativity",
    "Time Management",
];

const EmployerView = () => {
    const [collaborations, setCollaborations] = useState(mockCollaborations);
    const [selectedCollaboration, setSelectedCollaboration] = useState<
        (typeof mockCollaborations)[0] | null
    >(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
    const [qrJobTitle, setQrJobTitle] = useState("");
    const { toast } = useToast();

    const StarIcon = ({
        filled,
        interactive = false,
        onClick,
    }: {
        filled: boolean;
        interactive?: boolean;
        onClick?: () => void;
    }) => (
        <svg
            className={`w-6 h-6 ${
                interactive ? "cursor-pointer" : ""
            } transition-colors ${
                filled
                    ? "fill-amber-400 text-amber-400"
                    : "text-reputation-gray-300 hover:text-amber-300"
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
            onClick={onClick}
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

    const CheckCircleIcon = () => (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
    );

    const handleStarClick = (starRating: number) => {
        setRating(starRating);
    };

    const handleSkillToggle = (skill: string) => {
        setSelectedSkills((prev) =>
            prev.includes(skill)
                ? prev.filter((s) => s !== skill)
                : [...prev, skill]
        );
    };

    const handleSubmitReview = () => {
        if (!selectedCollaboration || rating === 0) return;

        setCollaborations((prev) =>
            prev.map((collab) =>
                collab.id === selectedCollaboration.id
                    ? { ...collab, status: "review_issued" as const }
                    : collab
            )
        );

        setRating(0);
        setReview("");
        setSelectedSkills([]);
        setIsDialogOpen(false);

        toast({
            title: "Credential successfully issued!",
            description: `Verifiable credential sent to ${selectedCollaboration.freelancerName}'s Wallet.`,
        });

        // Trigger window event to update freelancer data
        window.dispatchEvent(
            new CustomEvent("newReview", {
                detail: {
                    employerName: "Innovate Corp",
                    jobTitle: selectedCollaboration.jobTitle,
                    rating: rating,
                    review: review,
                    skills: selectedSkills,
                    freelancerName: selectedCollaboration.freelancerName,
                },
            })
        );
    };

    const handleQrScan = () => {
        if (!qrJobTitle.trim()) return;

        // Mock QR scan - automatically identifies Alice
        const mockFreelancer = {
            id: Date.now(),
            freelancerName: "Alice",
            jobTitle: qrJobTitle,
            status: "review_pending" as const,
        };

        setSelectedCollaboration(mockFreelancer);
        setQrJobTitle("");
        setIsQrDialogOpen(false);
        setIsDialogOpen(true);

        toast({
            title: "Freelancer identified!",
            description:
                "Alice has been identified. You can now write a review.",
        });
    };

    const renderStars = (currentRating: number, interactive = false) => {
        return Array.from({ length: 5 }, (_, i) => (
            <StarIcon
                key={i}
                filled={i < currentRating}
                interactive={interactive}
                onClick={interactive ? () => handleStarClick(i + 1) : undefined}
            />
        ));
    };

    return (
        <div className="space-y-6 lg:space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                        <div>
                            <CardTitle className="text-lg sm:text-xl font-bold text-reputation-gray-900">
                                My Recent Collaborations
                            </CardTitle>
                            <p className="text-reputation-gray-600">
                                Manage and review your recent project
                                collaborations
                            </p>
                        </div>
                        <Dialog
                            open={isQrDialogOpen}
                            onOpenChange={setIsQrDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <Button className="bg-reputation-blue-600 hover:bg-reputation-blue-700 transition-colors duration-200">
                                    <QrCode className="w-4 h-4 mr-2" />
                                    Scan QR Code
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>
                                        Scan Freelancer QR Code
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-center p-8 bg-reputation-gray-50 rounded-lg">
                                        <QrCode className="w-24 h-24 text-reputation-gray-400" />
                                    </div>
                                    <p className="text-sm text-reputation-gray-600 text-center">
                                        In a real implementation, this would
                                        activate your camera to scan a
                                        freelancer's QR code.
                                    </p>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-reputation-gray-700">
                                            Job Title for this Review
                                        </label>
                                        <Input
                                            placeholder="Enter the job title..."
                                            value={qrJobTitle}
                                            onChange={(e) =>
                                                setQrJobTitle(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex space-x-3">
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setIsQrDialogOpen(false)
                                            }
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleQrScan}
                                            disabled={!qrJobTitle.trim()}
                                            className="flex-1 bg-reputation-blue-600 hover:bg-reputation-blue-700"
                                        >
                                            Identify Freelancer
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {collaborations.map((collaboration) => (
                            <Card
                                key={collaboration.id}
                                className="border-reputation-gray-200 hover:shadow-md transition-shadow duration-200"
                            >
                                <CardContent className="p-4 sm:p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                                        <div className="space-y-3 flex-1">
                                            <div className="flex items-center space-x-2">
                                                <UserIcon />
                                                <span className="font-semibold text-reputation-gray-900">
                                                    {
                                                        collaboration.freelancerName
                                                    }
                                                </span>
                                            </div>

                                            <div>
                                                <h3 className="font-medium text-reputation-gray-900">
                                                    {collaboration.jobTitle}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="lg:ml-4">
                                            {collaboration.status ===
                                            "review_pending" ? (
                                                <Dialog
                                                    open={isDialogOpen}
                                                    onOpenChange={
                                                        setIsDialogOpen
                                                    }
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            className="bg-reputation-blue-600 hover:bg-reputation-blue-700 transition-colors duration-200 w-full lg:w-auto"
                                                            onClick={() => {
                                                                setSelectedCollaboration(
                                                                    collaboration
                                                                );
                                                                setIsDialogOpen(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            Review Pending
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-md sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-lg sm:text-xl">
                                                                Issue Verifiable
                                                                Review for{" "}
                                                                {
                                                                    selectedCollaboration?.freelancerName
                                                                }
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        {selectedCollaboration && (
                                                            <div className="space-y-6">
                                                                <div>
                                                                    <h3 className="font-semibold text-reputation-gray-900 mb-2">
                                                                        Job:{" "}
                                                                        {
                                                                            selectedCollaboration.jobTitle
                                                                        }
                                                                    </h3>
                                                                </div>

                                                                <div>
                                                                    <label className="block text-sm font-medium text-reputation-gray-700 mb-2">
                                                                        Rating *
                                                                    </label>
                                                                    <div className="flex space-x-1">
                                                                        {renderStars(
                                                                            rating,
                                                                            true
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <label className="block text-sm font-medium text-reputation-gray-700 mb-2">
                                                                        Public
                                                                        Comment
                                                                    </label>
                                                                    <Textarea
                                                                        placeholder="Share your experience working with this freelancer..."
                                                                        value={
                                                                            review
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setReview(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        className="min-h-[100px]"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label className="block text-sm font-medium text-reputation-gray-700 mb-3">
                                                                        Skills
                                                                        Verified
                                                                        (Optional)
                                                                    </label>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {predefinedSkills.map(
                                                                            (
                                                                                skill
                                                                            ) => (
                                                                                <Badge
                                                                                    key={
                                                                                        skill
                                                                                    }
                                                                                    variant={
                                                                                        selectedSkills.includes(
                                                                                            skill
                                                                                        )
                                                                                            ? "default"
                                                                                            : "outline"
                                                                                    }
                                                                                    className={`cursor-pointer transition-colors duration-200 ${
                                                                                        selectedSkills.includes(
                                                                                            skill
                                                                                        )
                                                                                            ? "bg-reputation-blue-600 hover:bg-reputation-blue-700"
                                                                                            : "hover:bg-reputation-gray-100"
                                                                                    }`}
                                                                                    onClick={() =>
                                                                                        handleSkillToggle(
                                                                                            skill
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        skill
                                                                                    }
                                                                                </Badge>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                    <p className="text-xs text-reputation-gray-500 mt-2">
                                                                        Click to
                                                                        select
                                                                        skills
                                                                        you can
                                                                        verify
                                                                        for this
                                                                        freelancer
                                                                    </p>
                                                                </div>

                                                                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                                                                    <Button
                                                                        variant="outline"
                                                                        onClick={() =>
                                                                            setIsDialogOpen(
                                                                                false
                                                                            )
                                                                        }
                                                                        className="transition-colors duration-200"
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                    <Button
                                                                        onClick={
                                                                            handleSubmitReview
                                                                        }
                                                                        disabled={
                                                                            rating ===
                                                                            0
                                                                        }
                                                                        className="bg-reputation-blue-600 hover:bg-reputation-blue-700 transition-colors duration-200"
                                                                    >
                                                                        Issue
                                                                        Verifiable
                                                                        Credential
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </DialogContent>
                                                </Dialog>
                                            ) : (
                                                <div className="flex items-center space-x-2 text-green-600">
                                                    <CheckCircleIcon />
                                                    <span className="font-medium">
                                                        Review Issued
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-reputation-blue-50 to-white border-reputation-blue-200">
                <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-reputation-gray-900">
                            Why Issue Verifiable Reviews?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium text-reputation-gray-900">
                                    Build Trust
                                </h4>
                                <p className="text-sm text-reputation-gray-600">
                                    Help freelancers build credible work
                                    histories that future clients can trust.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-reputation-gray-900">
                                    Support Quality
                                </h4>
                                <p className="text-sm text-reputation-gray-600">
                                    Recognize exceptional work and help talented
                                    professionals stand out.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-reputation-gray-900">
                                    Strengthen Network
                                </h4>
                                <p className="text-sm text-reputation-gray-600">
                                    Build lasting professional relationships
                                    with verified feedback.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EmployerView;
