const express = require("express");
const router = express.Router();
const plansControllers = require("../../controllers/Plans/plansControllers");
const auth = require("./../../controllers/Admin/auth");

router.post("/createPlans", auth.protect, plansControllers.createPlans);
router.patch(
  "/changedPlan/free",
  auth.protect,
  plansControllers.ChangedPlanFree
);
router.patch(
  "/changedPlan/premium",
  auth.protect,
  plansControllers.ChangedPlanPremium
);
router.get("/plans", auth.protect, plansControllers.getAllPlans);
router.get("/premium/price", auth.protect, plansControllers.getPremiumPrice);
router.patch(
  "/premium/price",
  auth.protect,
  plansControllers.updatePremiumPrice
);

module.exports = router;
