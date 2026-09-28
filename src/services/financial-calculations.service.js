function netPresentValue(rate, cashFlows) {
  return cashFlows.reduce((total, cashFlow, year) => total + cashFlow / (1 + rate) ** year, 0);
}

function equityMultiple(distributions, equityInvested) {
  if (!equityInvested) return null;
  return distributions / equityInvested;
}

// The underwriting editor will call these pure functions once its assumptions form is added.
module.exports = { equityMultiple, netPresentValue };
