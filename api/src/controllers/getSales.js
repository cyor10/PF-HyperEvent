const sales = [];
let totalProfit = 0; // Initialize totalProfit

async function postSales(req, res) {
  try {
    const { paymentInfo } = req.body;
    const { amount } = paymentInfo;

    // Update totalProfit by adding the new payment's amount
    totalProfit += parseFloat(amount);

    sales.push(paymentInfo);

    return res.status(201).json({ message: 'Payment information saved' });
  } catch (error) {
    res.status(404).json({ message: 'Error posting payment information', error });
  }
}

async function getSales(req, res) {
  try {
    // Include totalProfit in the response
    return res.status(200).json({ sales, totalProfit });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment information', error });
  }
}

module.exports = { postSales, getSales };