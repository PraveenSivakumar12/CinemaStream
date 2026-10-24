import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const navigate = useNavigate();

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "₹149",
      duration: "/ month",
      description: "For casual movie watchers",
      features: [
        "HD streaming",
        "Watch on 1 device",
        "Access to standard content",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "₹299",
      duration: "/ month",
      description: "For the ultimate streaming experience",
      features: [
        "4K streaming",
        "Watch on 4 devices",
        "Access to premium content",
        "Ad-free experience",
      ],
    },
  ];

  function handleSubscribe() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        state: { from: "/subscription" },
      });
      return;
    }

    // Demo only: this does NOT process a payment.
    // Connect this action to your backend and payment gateway.
    navigate("/subscription");
    alert(
      `You selected the ${selectedPlan} plan. Payment integration is required to activate it.`
    );
  }

  return (
    <section className="subscription-page">
      <div className="subscription-header">
        <h1>Choose Your Plan</h1>
        <p>
          Unlock a better entertainment experience with CinemaStream.
        </p>
      </div>

      <div className="subscription-plans">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={`subscription-card ${
              selectedPlan === plan.id ? "selected" : ""
            }`}
          >
            {plan.id === "premium" && (
              <span className="plan-badge">RECOMMENDED</span>
            )}

            <h2>{plan.name}</h2>

            <p className="plan-description">
              {plan.description}
            </p>

            <div className="plan-price">
              <strong>{plan.price}</strong>
              <span>{plan.duration}</span>
            </div>

            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>

            <button
              type="button"
              className="plan-button"
              onClick={() => {
                setSelectedPlan(plan.id);
              }}
            >
              {selectedPlan === plan.id
                ? "Selected"
                : "Choose Plan"}
            </button>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="subscribe-button"
        onClick={handleSubscribe}
      >
        Continue with {selectedPlan === "premium" ? "Premium" : "Basic"}
      </button>
    </section>
  );
}

export default Subscription;