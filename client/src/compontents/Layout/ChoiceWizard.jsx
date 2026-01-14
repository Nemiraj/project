import React from "react";
import "./ChoiceWizard.css";

const ChoiceWizard = () => {
  const steps = [
    {
      id: 1,
      title: "User Friendly",
      info: "Users need things to be as simple and easy as possible.",
      status: "complete",
    },
    {
      id: 2,
      title: "Maximum Choices",
      info: "New properties are listed every hour to help you find the perfect home.",
      status: "complete",
    },
    {
      id: 3,
      title: "Buyers Trust Us",
      info: "More properties, more choices to find your dream home.",
      status: "active",
    },
    {
      id: 4,
      title: "Sellers Prefer Us",
      info: "Sellers trust us for daily listings and faster visibility.",
      status: "disabled",
    },
  ];

  return (
    <section className="wizard">
      <div className="wizard-container">
        <div className="wizard-header">
          <h2>What Makes Us</h2>
          <p>The Preferred Choice</p>
        </div>

        <div className="wizard-steps">
          {steps.map((step, index) => (
            <div className="wizard-step" key={step.id}>
              {index !== 0 && (
                <span
                  className={`wizard-line ${
                    step.status !== "disabled" ? "active" : ""
                  }`}
                />
              )}

              <div className={`wizard-card ${step.status}`}>
                <div className="wizard-circle">{step.id}</div>
                <h3>{step.title}</h3>
                <p>{step.info}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChoiceWizard;
