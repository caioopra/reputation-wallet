import { createContext, useContext, useState, type ReactNode } from "react";

export interface Review {
    id: number;
    employerName: string;
    freelancerName: string; // Add this field
    jobTitle: string;
    dateIssued: string;
    rating: number;
    reviewSnippet: string;
    skills: string[];
}

export interface Collaboration {
    id: number;
    freelancerName: string;
    jobTitle: string;
    status: "review_pending" | "review_issued";
}

interface ReviewsContextType {
    reviews: Review[];
    collaborations: Collaboration[];
    addReview: (reviewData: {
        employerName: string;
        jobTitle: string;
        rating: number;
        review: string;
        skills: string[];
        freelancerName: string;
    }) => void;
    updateCollaborationStatus: (
        collaborationId: number,
        status: "review_pending" | "review_issued"
    ) => void;
    revokeReview: (reviewId: number) => void;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

const initialReviews: Review[] = [
    {
        id: 1,
        employerName: "FlowDesign Co",
        jobTitle: "UX/UI Design for Mobile App",
        dateIssued: "May 20, 2024",
        rating: 5,
        reviewSnippet:
            "Alice was exceptional. Her designs were creative and delivered ahead of schedule.",
        skills: ["UI Design", "Figma", "Prototyping", "Communication"],
        freelancerName: "Alice",
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
        freelancerName: "Alice",
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
        freelancerName: "Alice",
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
        freelancerName: "Alice",
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
        freelancerName: "Alice",
    },
];

const initialCollaborations: Collaboration[] = [
    {
        id: 1,
        freelancerName: "Alice",
        jobTitle: "UX/UI Design for Mobile App",
        status: "review_pending",
    },
    {
        id: 2,
        freelancerName: "Marcus Johnson",
        jobTitle: "Frontend Development",
        status: "review_pending",
    },
    {
        id: 3,
        freelancerName: "Sarah Chen",
        jobTitle: "Content Strategy & Writing",
        status: "review_pending",
    },
    {
        id: 4,
        freelancerName: "David Rodriguez",
        jobTitle: "Backend API Development",
        status: "review_pending",
    },
];

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [collaborations, setCollaborations] = useState<Collaboration[]>(
        initialCollaborations
    );

    const addReview = (reviewData: {
        employerName: string;
        freelancerName: string; // Include freelancerName
        jobTitle: string;
        rating: number;
        review: string;
        skills: string[];
    }) => {
        const newReview: Review = {
            id: Date.now(),
            employerName: reviewData.employerName,
            freelancerName: reviewData.freelancerName, // Add freelancerName
            jobTitle: reviewData.jobTitle,
            dateIssued: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            rating: reviewData.rating,
            reviewSnippet:
                reviewData.review ||
                "Great work and professional collaboration.",
            skills: reviewData.skills || [],
        };

        setReviews((prev) => [newReview, ...prev]);
    };

    const updateCollaborationStatus = (
        collaborationId: number,
        status: "review_pending" | "review_issued"
    ) => {
        setCollaborations((prev) =>
            prev.map((collab) =>
                collab.id === collaborationId ? { ...collab, status } : collab
            )
        );
    };

    const revokeReview = (reviewId: number) => {
        setReviews((prev) => prev.filter((review) => review.id !== reviewId));
    };

    return (
        <ReviewsContext.Provider
            value={{
                reviews,
                collaborations,
                addReview,
                updateCollaborationStatus,
                revokeReview,
            }}
        >
            {children}
        </ReviewsContext.Provider>
    );
};

export const useReviews = () => {
    const context = useContext(ReviewsContext);
    if (context === undefined) {
        throw new Error("useReviews must be used within a ReviewsProvider");
    }
    return context;
};
