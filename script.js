function submitForm(event) {
    event.preventDefault();

    // Fetch all form values
    const category = document.getElementById("category").value;
    const ticketType = document.getElementById("availableTickets");
    const ticketTypeText = ticketType.options[ticketType.selectedIndex].text;
    const ticketPrice = parseInt(ticketType.value);
    const noOfTickets = parseInt(document.getElementById("NoOfTickets").value);
    const name = document.getElementById("name").value;
    const bookingDate = document.getElementById("bookingDate").value;
    const totalPrice = ticketPrice * noOfTickets;

    // Store in window for later use (for ticket generation)
    window.bookingData = {
        category,
        ticketTypeText,
        ticketPrice,
        noOfTickets,
        name,
        bookingDate,
        totalPrice
    };

    // Generate dynamic UPI QR code with amount
    const qrImg = document.querySelector("#upiPaymentSection img");
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=7679986878@upi&pn=HallaEntry&am=${totalPrice}&cu=INR`;

    // Show UPI Payment section
    document.getElementById("upiPaymentSection").classList.remove("hidden");
}

function confirmPayment() {
    const {
        category,
        ticketTypeText,
        ticketPrice,
        noOfTickets,
        name,
        bookingDate,
        totalPrice
    } = window.bookingData;

    // Hide payment section and show booking details
    document.getElementById("upiPaymentSection").classList.add("hidden");

    document.getElementById("categoryDisplay").textContent = `Event: ${category}`;
    document.getElementById("timingDisplay").textContent = `Event Time: 7:00 PM`;
    document.getElementById("availableSeatDisplay").textContent = `Ticket Type: ${ticketTypeText} (₹${ticketPrice} x ${noOfTickets}) = ₹${totalPrice}`;
    document.getElementById("nameDisplay").textContent = `Name: ${name}`;
    document.getElementById("bookingDateDisplay").textContent = `Booking Date: ${bookingDate}`;
    document.getElementById("seatTypeDisplay").textContent = `Total Tickets: ${noOfTickets}`;
    document.getElementById("successMessage").textContent = `Payment received! Booking confirmed.`;

    document.getElementById("bookingDetails").classList.remove("hidden");
    document.getElementById("downloadTicketBtn").classList.remove("hidden");
}

document.getElementById("downloadTicketBtn").addEventListener("click", function () {
    const { category, ticketTypeText, noOfTickets, name, bookingDate } = window.bookingData;

    const ticketContent = `🎫 HALLA ENTRY TICKET 🎫\n\nName: ${name}\nEvent: ${category}\nDate: ${bookingDate}\nTicket Type: ${ticketTypeText}\nNumber of Tickets: ${noOfTickets}\n\nEnjoy your event! 🎉`;

    const blob = new Blob([ticketContent], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Ticket.txt";
    link.click();
});
