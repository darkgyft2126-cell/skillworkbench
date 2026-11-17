// SkillWorkbench portal config. Brand and domain live here as single
// values so they can be attached or swapped without rework.
window.SW_CONFIG = {
  brand: "SkillWorkbench",
  domain: "skillworkbench.com",
  priceMonthly: 19,
  priceYearly: 190,
  // Backend (member accounts). Deploy per backend/README.md, then this
  // URL becomes live. Until then the dashboard explains itself.
  apiBase: "https://skillworkbench-backend.onrender.com",
  // Stripe Payment Links. Placeholders until the links in STRIPE-SPEC.md
  // are created; subscribe.js shows the launch note while these are unset.
  stripeMonthly: "STRIPE_LINK_MONTHLY_PLACEHOLDER",
  stripeYearly: "STRIPE_LINK_YEARLY_PLACEHOLDER"
};
