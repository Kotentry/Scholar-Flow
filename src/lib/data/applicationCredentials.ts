interface ApplicationCredential {
  token: string; // Encrypted token containing school and user info
  email: string;
  schoolId: string;
  progress: {
    currentStep: string;
    currentSubStep: string;
    completedSteps: string[];
    completedSubSteps: string[];
  };
  lastUpdated: string;
}

// In a real app, these would be encrypted tokens containing school and user info
export const dummyCredentials: Record<string, ApplicationCredential> = {
  "APP-123456": {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // This would be a real JWT token
    email: "john@example.com",
    schoolId: "school-1",
    progress: {
      currentStep: "personal-info",
      currentSubStep: "basic-details",
      completedSteps: [],
      completedSubSteps: [],
    },
    lastUpdated: "2024-01-15T10:30:00Z",
  },
  "APP-789012": {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    email: "jane@example.com",
    schoolId: "school-2",
    progress: {
      currentStep: "academic-history",
      currentSubStep: "previous-schools",
      completedSteps: ["personal-info", "guardian-info"],
      completedSubSteps: [
        "basic-details",
        "contact-info",
        "address",
        "profile-photo",
        "parent-details",
        "emergency-contacts",
        "relationship",
      ],
    },
    lastUpdated: "2024-01-16T15:45:00Z",
  },
};
