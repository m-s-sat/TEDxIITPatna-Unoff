<script setup>
import { defineProps, defineEmits, onMounted } from "vue";

const props = defineProps({
  ticketDetails: {
    type: Object,
    required: true,
  },
  customerDetails: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  "payment-success",
  "payment-failed",
  "payment-cancelled",
]);

const loadRazorPay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Function to create organized notes for ticket payment (Max 15 fields for Razorpay)
const createTicketPaymentNotes = () => {
  // Check what IIT Patna details are provided
  const hasIITPRollNo =
    props.customerDetails.iitp_roll_no &&
    props.customerDetails.iitp_roll_no.trim() !== "";
  const hasIITPProgram =
    props.customerDetails.iitp_program_type &&
    props.customerDetails.iitp_program_type.trim() !== "";
  const hasIITPHostel =
    props.customerDetails.iitp_hostel &&
    props.customerDetails.iitp_hostel.trim() !== "";

  if (hasIITPRollNo) {
    // CURRENT IIT PATNA STUDENT (with roll number) - 13 fields max
    return {
      // CLEAR IDENTIFICATION (3 fields)
      orderType: "🎓 ON_CAMPUS_STUDENT",
      customerType: "IIT PATNA CURRENT STUDENT",
      studentVerification: `Roll: ${props.customerDetails.iitp_roll_no}`,

      // STUDENT DETAILS (3 fields)
      studentName: props.customerDetails.name,
      email: props.customerDetails.email,
      phoneAge: `${props.customerDetails.phone} | Age: ${props.customerDetails.age}`,

      // ACADEMIC INFO (2 fields) - Combined for space efficiency
      programHostel: `${
        props.customerDetails.iitp_program_type || "Program TBD"
      } | ${props.customerDetails.iitp_hostel || "Hostel TBD"}`,
      gender: props.customerDetails.gender,

      // EVENT DETAILS (4 fields) - Combined for efficiency
      ticketEvent: `${props.ticketDetails.name}`,
      sessionDetails: getSessionTypeText(props.ticketDetails.session_type),
      venueDate: `${props.ticketDetails.venue} | ${props.ticketDetails.event_date}`,
      priceTime: `₹${
        props.ticketDetails.offerPrice
      } | ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
    };
  } else if (hasIITPProgram || hasIITPHostel) {
    // IIT PATNA ALUMNI/OFF-CAMPUS (has program or hostel but no roll) - 12 fields max
    return {
      // CLEAR IDENTIFICATION (3 fields)
      orderType: "🎓 OFF_CAMPUS_ALUMNI",
      customerType: "IIT PATNA ALUMNI",
      alumniVerification: `${
        props.customerDetails.iitp_program_type || "Former Student"
      }`,

      // ALUMNI DETAILS (3 fields)
      alumniName: props.customerDetails.name,
      email: props.customerDetails.email,
      phoneAgeGender: `${props.customerDetails.phone} | Age: ${props.customerDetails.age} | ${props.customerDetails.gender}`,

      // EVENT DETAILS (4 fields)
      ticketEvent: `${props.ticketDetails.name}`,
      sessionDetails: getSessionTypeText(props.ticketDetails.session_type),
      venueDate: `${props.ticketDetails.venue} | ${props.ticketDetails.event_date}`,
      priceTime: `₹${
        props.ticketDetails.offerPrice
      } | ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,

      // CONNECTION INFO (2 fields)
      campusConnection: props.customerDetails.iitp_hostel
        ? `Former Hostel: ${props.customerDetails.iitp_hostel}`
        : "Alumni - No hostel info",
      alumniProgram:
        props.customerDetails.iitp_program_type || "Program not specified",
    };
  } else {
    // EXTERNAL PARTICIPANT (no IIT Patna details) - 11 fields max
    return {
      // CLEAR IDENTIFICATION (3 fields)
      orderType: "🌐 EXTERNAL_PARTICIPANT",
      customerType: "EXTERNAL PARTICIPANT",
      participantStatus: "NON_IITP_EXTERNAL",

      // CUSTOMER DETAILS (3 fields)
      customerName: props.customerDetails.name,
      email: props.customerDetails.email,
      phoneAgeGender: `${props.customerDetails.phone} | Age: ${props.customerDetails.age} | ${props.customerDetails.gender}`,

      // EVENT DETAILS (4 fields)
      ticketEvent: `${props.ticketDetails.name}`,
      sessionDetails: getSessionTypeText(props.ticketDetails.session_type),
      venueDate: `${props.ticketDetails.venue} | ${props.ticketDetails.event_date}`,
      priceTime: `₹${
        props.ticketDetails.offerPrice
      } | ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,

      // EXTERNAL INFO (1 field)
      externalNote: "No IIT Patna affiliation",
    };
  }
};

const getSessionTypeText = (sessionType) => {
  switch (sessionType) {
    case "1":
      return "Morning Session (9:00 AM - 12:30 PM)";
    case "2":
      return "Afternoon Session (2:00 PM - 6:00 PM)";
    case "full":
      return "Full Event (9:00 AM - 6:00 PM)";
    default:
      return "TEDx Event Session";
  }
};

const initializePayment = async () => {
  console.log("🔄 Initializing ticket payment...");
  console.log("📋 Ticket Details:", props.ticketDetails);
  console.log("👤 Customer Details:", props.customerDetails);

  const result = await loadRazorPay();
  if (!result) {
    console.error("❌ Failed to load Razorpay script");
    alert("Failed to load Razorpay script");
    emit("payment-failed", { error: "Failed to load payment gateway" });
    return;
  }
  console.log("✅ Razorpay script loaded successfully");

  // Validate required data with detailed logging
  const validationErrors = [];

  if (!props.ticketDetails.offerPrice) {
    validationErrors.push("Missing ticket price");
  }
  if (!props.customerDetails.name || props.customerDetails.name.trim() === "") {
    validationErrors.push("Missing customer name");
  }
  if (
    !props.customerDetails.email ||
    props.customerDetails.email.trim() === ""
  ) {
    validationErrors.push("Missing customer email");
  }
  if (
    !props.customerDetails.phone ||
    props.customerDetails.phone.trim() === ""
  ) {
    validationErrors.push("Missing customer phone");
  }

  if (validationErrors.length > 0) {
    console.error("❌ Validation failed:", validationErrors);
    alert(
      `Missing required payment information:\n${validationErrors.join("\n")}`
    );
    emit("payment-failed", { error: "Missing required payment information" });
    return;
  }
  console.log("✅ Validation passed");

  // Get organized notes for ticket payment
  const paymentNotes = createTicketPaymentNotes();
  const isIITPStudent =
    props.customerDetails.iitp_roll_no &&
    props.customerDetails.iitp_roll_no.trim() !== "";

  const options = {
    key: "rzp_test_FztPn21izAOHeu", // Your Razorpay test key
    amount: Math.round(props.ticketDetails.offerPrice * 100), // Amount in paisa (multiply by 100)
    currency: "INR",
    name: "TEDx IIT Patna 2024",
    description: `${getSessionTypeText(props.ticketDetails.session_type)} - ${
      props.ticketDetails.name
    }`,
    image: props.ticketDetails.image,
    handler: function (response) {
      // Payment success handler
      console.log("Ticket payment successful:", response);
      emit("payment-success", {
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id || null,
        signature: response.razorpay_signature || null,
        orderType: "ticket_purchase",
        customerCategory: paymentNotes.customerCategory,
        ticketDetails: props.ticketDetails,
        customerDetails: props.customerDetails,
      });
    },
    prefill: {
      name: props.customerDetails.name,
      email: props.customerDetails.email,
      contact: props.customerDetails.phone,
    },
    modal: {
      ondismiss: function () {
        console.log("Ticket payment cancelled by user");
        emit("payment-cancelled");
      },
    },
    notes: paymentNotes,
    theme: {
      color: isIITPStudent ? "#059669" : "#dc2626", // Green for students, red for external
    },
  };

  console.log("💳 Razorpay options:", options);

  try {
    // Check if Razorpay is available
    if (typeof window.Razorpay === "undefined") {
      throw new Error("Razorpay is not loaded");
    }

    console.log("🚀 Creating Razorpay payment object...");
    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function (response) {
      console.error("❌ Ticket payment failed:", response.error);
      emit("payment-failed", {
        error: response.error.description,
        code: response.error.code,
        reason: response.error.reason,
      });
    });

    console.log("🎯 Opening Razorpay payment modal...");
    paymentObject.open();
    console.log("✅ Razorpay modal opened successfully");
  } catch (error) {
    console.error("❌ Razorpay initialization error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      windowRazorpay: typeof window.Razorpay,
    });
    alert(`Payment initialization failed: ${error.message}`);
    emit("payment-failed", { error: error.message });
  }
};

onMounted(() => {
  initializePayment();
});
</script>

<template>
  <div class="payment-container">
    <div class="payment-loading">
      <div class="ticket-payment-header">
        <h3>🎫 Processing Ticket Payment</h3>
        <div class="ticket-summary">
          <h4>{{ ticketDetails.name }}</h4>
          <p class="session-info">
            {{ getSessionTypeText(ticketDetails.session_type) }}
          </p>
          <p class="venue-info">
            📍 {{ ticketDetails.venue }} • {{ ticketDetails.event_date }}
          </p>
          <p class="price-info">Amount: ₹{{ ticketDetails.offerPrice }}</p>
        </div>
      </div>

      <div class="loading-section">
        <p>Please wait while we prepare your payment gateway...</p>
        <div class="loader"></div>

        <div class="payment-info">
          <div class="info-item">
            <span class="icon">👤</span>
            <span>{{ customerDetails.name }}</span>
          </div>
          <div class="info-item">
            <span class="icon">📧</span>
            <span>{{ customerDetails.email }}</span>
          </div>
          <div class="info-item" v-if="customerDetails.iitp_roll_no">
            <span class="icon">🎓</span>
            <span>IIT Patna Student ({{ customerDetails.iitp_roll_no }})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.payment-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
  border-radius: 16px;
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
}

.payment-loading {
  text-align: center;
  color: #374151;
  width: 100%;
}

.ticket-payment-header {
  margin-bottom: 30px;
}

.ticket-payment-header h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #dc2626;
  font-weight: 700;
}

.ticket-summary {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #dc2626;
  margin-bottom: 20px;
}

.ticket-summary h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.session-info {
  font-size: 0.95rem;
  color: #059669;
  font-weight: 600;
  margin: 0 0 6px 0;
}

.venue-info {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0 0 8px 0;
}

.price-info {
  font-size: 1.1rem;
  font-weight: 700;
  color: #dc2626;
  margin: 0;
}

.loading-section p {
  margin-bottom: 20px;
  color: #6b7280;
  font-size: 1rem;
}

.loader {
  border: 4px solid #e5e7eb;
  border-top: 4px solid #dc2626;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 30px auto;
}

.payment-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: #374151;
}

.info-item .icon {
  font-size: 1rem;
  width: 20px;
  text-align: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Animation */
.payment-container {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .payment-container {
    padding: 20px;
    min-height: 400px;
  }

  .ticket-payment-header h3 {
    font-size: 1.5rem;
  }

  .ticket-summary {
    padding: 15px;
  }
}
</style>
