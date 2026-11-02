import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { currentUser, isLoggedIn, upgradeSubscription } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "₹149",
      duration: "/ month",
      description: "For casual movie watchers",
      features: [
        "Full HD 1080p streaming",
        "Watch on 1 device at a time",
        "Access to all trailers & OTT navigation",
        "Personal watchlist synchronization",
      ],
    },
    {
      id: "premium",
      name: "Premium VIP",
      price: "₹299",
      duration: "/ month",
      description: "For the ultimate cinema streaming experience",
      features: [
        "Ultra HD 4K & Dolby Vision",
        "Watch on 4 devices simultaneously",
        "Exclusive access to Premium Collection",
        "Ad-free cinematic experience",
        "Priority customer support",
      ],
    },
  ];

  function handleSubscribe() {
    if (!isLoggedIn) {
      navigate("/login", {
        state: { from: { pathname: "/subscription" } },
      });
      return;
    }

    // Upgrade the user's plan in context and persistence
    upgradeSubscription(selectedPlan);
    setShowSuccessModal(true);
  }

  return (
    <section className="subscription-page">
      <div className="subscription-header">
        <span className="premium-label">✦ CINEMASTREAM MEMBERSHIP</span>
        <h1>Choose Your Entertainment Plan</h1>
        <p>
          Unlock exclusive 4K content, unlimited trailers, and personalized streaming.
        </p>
        {isLoggedIn && currentUser?.isSubscribed && (
          <div className="current-plan-banner">
            <span>🎉 Current Active Plan: <strong>{currentUser.plan?.toUpperCase()}</strong></span>
            <Link to="/premium" className="plan-vip-link">
              Access Premium Content →
            </Link>
          </div>
        )}
      </div>

      <div className="subscription-plans">
        {plans.map((plan) => {
          const isCurrentActive =
            isLoggedIn &&
            currentUser?.isSubscribed &&
            currentUser?.plan === plan.id;

          return (
            <article
              key={plan.id}
              className={`subscription-card ${
                selectedPlan === plan.id ? "selected" : ""
              } ${isCurrentActive ? "is-active-plan" : ""}`}
            >
              {plan.id === "premium" && (
                <span className="plan-badge">RECOMMENDED</span>
              )}

              {isCurrentActive && (
                <span className="active-tag-badge">YOUR PLAN</span>
              )}

              <h2>{plan.name}</h2>

              <p className="plan-description">{plan.description}</p>

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
                onClick={() => setSelectedPlan(plan.id)}
              >
                {selectedPlan === plan.id ? "Selected Plan" : "Choose Plan"}
              </button>
            </article>
          );
        })}
      </div>

      <button
        type="button"
        className="subscribe-button"
        onClick={handleSubscribe}
      >
        {isLoggedIn
          ? `Activate ${selectedPlan === "premium" ? "Premium VIP" : "Basic"} Plan`
          : "Sign In to Subscribe"}
      </button>

      {showSuccessModal && (
        <div className="modal-backdrop-success" role="dialog" aria-modal="true">
          <div className="success-dialog-card">
            <span className="success-icon">🎉</span>
            <h2>Subscription Activated!</h2>
            <p>
              Congratulations, <strong>{currentUser?.name}</strong>! Your account has been
              upgraded to <strong>{selectedPlan.toUpperCase()}</strong>.
              You now have full access to our exclusive Premium Collection.
            </p>
            <div className="success-dialog-actions">
              <button
                type="button"
                className="feature-primary-btn"
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/premium");
                }}
              >
                Go to Premium Collection →
              </button>
              <button
                type="button"
                className="feature-secondary-btn"
                onClick={() => setShowSuccessModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Subscription;