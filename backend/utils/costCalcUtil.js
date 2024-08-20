exports.costCalcUtil = (lng, quantity, weight, cost, calc_delivery, calc_cost, min_sum) => {
    const dollarExchangeRate = 90;
    let totalCost;

    if (calc_delivery === 'kg') {
        if (calc_cost.includes('%')) {
            const percent = parseFloat(calc_cost.replace('%', ''));
            totalCost = (percent / 100) * weight * cost;
            if (totalCost < min_sum) return { min_sum: min_sum }
        } else {
            totalCost = calc_cost * weight;
            if (totalCost < min_sum) return { min_set: false, min_sum: min_sum }
        }
    } if (calc_delivery === 'item') {
        if (calc_cost.includes('%')) {
            const percent = parseFloat(calc_cost.replace('%', ''));
            totalCost = (percent / 100) * quantity * cost;
            if (totalCost < min_sum) return { min_set: false, min_sum: min_sum }
        } else {
            totalCost = calc_cost * quantity;
            if (totalCost < min_sum) return { min_set: false, min_sum: min_sum }
        }
    }
    if (lng === 'ru') {
        totalCost = totalCost * dollarExchangeRate;
    }
    return { cost: totalCost }
}