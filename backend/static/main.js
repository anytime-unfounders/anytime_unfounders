console.log("sanity check");

fetch("/config/")
    .then((result) => { return result.json(); })
    .then((data) => {
        const stripe = Stripe(data.publicKey);
        // Event handler
    document.querySelector("#submitBtn").addEventListener("click", () => {
        // Get Checkout Session ID
        fetch("/create-checkout-session/")
        .then((result) => { return result.json(); })
        .then((data) => {
        console.log(data);
        // Redirect to Stripe Checkout
        return stripe.redirectToCheckout({sessionId: data.sessionId})
        })
        .then((res) => {
        console.log(res);
    });
  });
});