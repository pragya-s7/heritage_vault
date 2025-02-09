import React from "react";

function OnboardingPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-[var(--color-primary)] mb-6">Onboarding</h1>
      <p className="text-lg text-gray-700 mb-4">
        Follow the steps below to set up your family vault and invite members.
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-800">
        <li>Create a user profile.</li>
        <li>Set up your first family vault.</li>
        <li>Invite family members via email.</li>
      </ol>
    </div>
  );
}

export default OnboardingPage;