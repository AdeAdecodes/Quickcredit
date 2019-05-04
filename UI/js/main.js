const Approveloan = document.getElementById(`Approveloan`);
const Rejectloan = document.getElementById(`Rejectloan`);
if (Approveloan) {
  Approveloan.addEventListener('click', () => {
    document.getElementById('Approve-loan').style.display = 'block';
  });
}
if (Rejectloan) {
  Rejectloan.addEventListener('click', () => {
    document.getElementById('Reject-loan').style.display = 'block';
  });
} 
if (positiveReject) {
positiveReject.addEventListener('click', () => {
  document.getElementById('Approve-loan').style.display = 'none';
  document.getElementById('Reject-loan').style.display = 'none';
});
}

if (negativeReject) {
negativeReject.addEventListener('click', () => {
  document.getElementById('Approve-loan').style.display = 'none';
  document.getElementById('Reject-loan').style.display = 'none';
});
}

if (positiveApprove) {
positiveApprove.addEventListener('click', () => {
  document.getElementById('Approve-loan').style.display = 'none';
  document.getElementById('Reject-loan').style.display = 'none';
});
}

if (negativeApprove) {
negativeApprove.addEventListener('click', () => {
  document.getElementById('Approve-loan').style.display = 'none';
  document.getElementById('Reject-loan').style.display = 'none';
});
}

for (let i = 1; i < 6; i++) {
  const activateAccount = document.getElementById(`activateAccount${i}`);
if (activateAccount) {
activateAccount.addEventListener('click', () => {
document.getElementById('activate-account').style.display = 'block';
});
}

if (positiveActivate) {
positiveActivate.addEventListener('click', () => {
document.getElementById('activate-account').style.display = 'none';
document.getElementById('deactivate-account').style.display = 'none';
});
}

if (negativeActivate) {
negativeActivate.addEventListener('click', () => {
document.getElementById('activate-account').style.display = 'none';
document.getElementById('deactivate-account').style.display = 'none';
});
}
}

function formValidator() {
     // Look up the input and output elements in the document signin.html
    const result = document.getElementById("wrongInput");
    const pwd = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    if (email == null || email == "" || pwd.length < 6) {
      return (result.innerHTML = "Invalid email or  wrong password.");
    }
  }
function calculate() {
    // Look up the input and output elements in the document calculate.html
    var amount = document.getElementById("amount");
    var interest = document.getElementById("interest");
    var months = document.getElementById("months");
    var payment = document.getElementById("payment");
    var total = document.getElementById("total");
    var totalinterest = document.getElementById("totalinterest");

    // Convert interest rate from percentage to decimal
    // Convert payment period in month to number of monthly payments
    var principal = parseFloat(amount.value.replace(/,/g, ""));
    var rate = parseFloat(interest.value) / 100 / 12;
    var payments = parseFloat(months.value) * 1;
  
    // Compute the monthly payment
    var x = Math.pow(1 + rate, payments);
    var monthly = (principal * x * rate) / (x - 1);
  
    // If the result is a finite number, the user's input was good
    // and we have meaningful results to display
    if (isFinite(monthly)) {
      // Fill in the output fields, rounding to 2 decimal places
      payment.innerHTML = formatNumber(monthly, 2);
      total.innerHTML = formatNumber(monthly * payments, 2);
      totalinterest.innerHTML = formatNumber(monthly * payments - principal, 2);
    } else {
      // Result was NaN or Infinite,
      // which means the input was incomplete or invalid.
      // Clear any previously-displayed output.
      payment.innerHTML = "";
      total.innerHTML = "";
      totalinterest.innerHTML = "";
    }
  }

  function formatNumber(num, decimals) {
    return num.toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  

 