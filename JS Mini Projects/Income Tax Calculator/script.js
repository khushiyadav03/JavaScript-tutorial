const form = document.getElementById("taxForm");
const incomeInput = document.getElementById("income");
const taxAmount = document.getElementById("taxAmount");
const resultText = document.getElementById("resultText");

function formatCurrency(amount) {
    return `Rs ${amount.toLocaleString("en-IN")}`;
}

function calculateTax(amount) {
    if (amount <= 1200000) return 0;
    if (amount <= 1600000) return (amount - 1200000) * 0.15;
    if (amount <= 2000000) return (amount - 1600000) * 0.2 + 60000;
    if (amount <= 2400000) return (amount - 2000000) * 0.25 + 140000;
    if (amount <= 2800000) return (amount - 2400000) * 0.3 + 240000;
    if (amount <= 3200000) return (amount - 2800000) * 0.35 + 360000;
    if (amount <= 3600000) return (amount - 3200000) * 0.4 + 500000;
    if (amount <= 4000000) return (amount - 3600000) * 0.45 + 660000;

    return (amount - 4000000) * 0.45 + 840000;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const amount = Number(incomeInput.value);

    if (!Number.isFinite(amount) || amount < 0) {
        taxAmount.textContent = "Rs 0";
        resultText.textContent = "Please enter a valid annual income to calculate tax.";
        return;
    }

    const totalTax = Math.round(calculateTax(amount));

    taxAmount.textContent = formatCurrency(totalTax);

    if (totalTax === 0) {
        resultText.textContent = `On an annual income of ${formatCurrency(amount)}, your tax is zero under the slab logic used in this project.`;
        return;
    }

    resultText.textContent = `For an annual income of ${formatCurrency(amount)}, your estimated total tax is ${formatCurrency(totalTax)}.`;
});
