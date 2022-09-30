const Plans = require("./../../models/Plans/plansModel");
const PremiumPrice = require("./../../models/Plans/premiumPriceModel");

exports.createPlans = async (req, res) => {
  try {
    const { planName } = req.body;
    const plansCounts = await Plans.find().count();
    const createPlan = await Plans.create({
      planName,
      plan: plansCounts,
    });
    res.status(200).json({
      status: "success",
      message: "Successfully create Plan",
      plan: createPlan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};

exports.ChangedPlanFree = async (req, res) => {
  try {
    const { id, free } = req.body;
    const plan = await Plans.findByIdAndUpdate(id, { free });
    res.status(200).json({
      status: "success",
      message: " Successfully updated Plan",
      plan,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "internal server error" });
  }
};
exports.ChangedPlanPremium = async (req, res) => {
  try {
    const { id, premium } = req.body;
    const plan = await Plans.findByIdAndUpdate(id, { premium });
    res.status(200).json({
      status: "success",
      message: " Successfully updated Plan",
      plan,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "internal server error" });
  }
};
exports.getAllPlans = async (req, res) => {
  const plans = await Plans.find().sort({ plan: +1 });
  if (plans.length > 1) {
    res.status(200).json({ status: "success", message: "success", plans });
  } else {
    const createPlans = await Plans.create([
      { planName: "Like the User", plan: 0 },
      { planName: "20 video/bio per day", plan: 1 },
      { planName: "Message viewing", plan: 2 },
      { planName: "See panel with people who liked you", plan: 3 },
      { planName: "Video calling feature", plan: 4 },
      { planName: "1 monthly video calls for 2 minutes", plan: 5 },
      { planName: "Send unlimited messages", plan: 6 },
      { planName: "Hide online Feature", plan: 7 },
      { planName: "Hide Location  Feature", plan: 8 },
      { planName: "Be shown only to people you like", plan: 9 },
      { planName: "Control age and distance information", plan: 10 },
      { planName: "Disable Ads", plan: 11 },
      { planName: "Find my mate a date", plan: 12 },
    ]);
    res
      .status(200)
      .json({ status: "success", message: "success", plans: createPlans });
  }
  try {
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server Error",
    });
  }
};

exports.getPremiumPrice = async (req, res) => {
  try {
    const premiumPrice = await PremiumPrice.findOne({ premium: "premium" });
    if (premiumPrice) {
      res.status(200).json({
        status: "success",
        message: "Price Updated Successfully",
        premiumPrice,
      });
    } else {
      const premiumPrice = await PremiumPrice.create({ premium: "premium" });
      res.status(200).json({
        status: "success",
        message: "Price Updated Successfully",
        premiumPrice,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server Error",
    });
  }
};

exports.updatePremiumPrice = async (req, res) => {
  try {
    const premiumPrice = await PremiumPrice.findOne({ premium: "premium" });
    const { weekly, monthly, quaterly, yearly } = req.body;
    if (weekly) {
      premiumPrice.weekly = weekly;
      await premiumPrice.save();
      res.status(200).json({
        status: "success",
        message: "Price Updated Successfully",
        premiumPrice,
      });
    } else if (monthly) {
      premiumPrice.monthly = monthly;
      await premiumPrice.save();
      res.status(200).json({
        status: "success",
        message: "Price Updated Successfully",
        premiumPrice,
      });
    } else if (quaterly) {
      premiumPrice.quaterly = quaterly;
      await premiumPrice.save();
      res.status(200).json({
        status: "success",
        message: "Price Updated Successfully",
        premiumPrice,
      });
    } else if (yearly) {
      premiumPrice.yearly = yearly;
      await premiumPrice.save();
      res.status(200).json({
        status: "success",
        message: "Price Updated Successfully",
        premiumPrice,
      });
    } else {
      res.status(404).json({
        status: "notfound",
        message: "not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server Error",
    });
  }
};
