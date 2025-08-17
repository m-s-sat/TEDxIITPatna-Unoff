<script setup>
import { defineProps, defineEmits, onMounted } from "vue";

const props = defineProps({
  orderDetails: {
    type: Object,
    required: true,
  },
  customerDetails: {
    type: Object,
    required: true,
  },
  orderType: {
    type: String,
    default: "campus_student", // "campus_student" or "outside_campus"
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

// Function to create organized notes based on order type (Max 15 fields for Razorpay)
const createPaymentNotes = () => {
  if (props.orderType === "campus_student") {
    // Campus Student Notes (14 fields - within limit)
    return {
      // Order Identification (3 fields)
      orderType: "CAMPUS_STUDENT",
      customerCategory: "IIT PATNA CAMPUS STUDENT",
      orderTime: new Date().toLocaleString("en-IN"),

      // Customer Info (3 fields)
      studentName:
        props.customerDetails.name || props.customerDetails.studentName,
      email: props.customerDetails.email,
      whatsapp:
        props.customerDetails.whatsappNo ||
        props.customerDetails.whatsapp_number,

      // Student Academic Info (4 fields)
      rollNo: props.customerDetails.rollNo || "Not provided",
      hostel: props.customerDetails.hostel || "Not provided",
      program: props.customerDetails.programType || "Not provided",
      year: props.customerDetails.year || "Not provided",

      // Product Info (3 fields)
      product: `${props.orderDetails.name} (${props.orderDetails.type})`,
      size: props.orderDetails.size,
      price: `₹${props.orderDetails.offerPrice}`,

      // Delivery Info (1 field)
      delivery: "CAMPUS PICKUP - Contact via WhatsApp",
    };
  } else {
    // Outside Campus Notes (15 fields - at limit)
    return {
      // Order Identification (3 fields)
      orderType: "OUTSIDE_CAMPUS",
      customerCategory: "OUTSIDE CAMPUS CUSTOMER",
      orderTime: new Date().toLocaleString("en-IN"),

      // Customer Info (3 fields)
      customerName: props.customerDetails.name,
      email: props.customerDetails.email,
      whatsapp: props.customerDetails.whatsapp_number,

      // Address Info (5 fields)
      street: props.customerDetails.street || "Not provided",
      city: props.customerDetails.city || "Not provided",
      state: props.customerDetails.state || "Not provided",
      pincode: props.customerDetails.pincode || "Not provided",
      fullAddress: props.customerDetails.address || "Not provided",

      // Product Info (3 fields)
      product: `${props.orderDetails.name} (${props.orderDetails.type})`,
      size: props.orderDetails.size,
      price: `₹${props.orderDetails.offerPrice}`,

      // Alumni Status (1 field)
      alumniStatus: props.customerDetails.iitp_mail_id
        ? `ALUMNUS: ${props.customerDetails.iitp_mail_id}`
        : "EXTERNAL CUSTOMER",
    };
  }
};

const initializePayment = async () => {
  const result = await loadRazorPay();
  if (!result) {
    alert("Failed to load Razorpay script");
    emit("payment-failed", { error: "Failed to load payment gateway" });
    return;
  }

  // Validate required data
  if (
    !props.orderDetails.offerPrice ||
    !props.customerDetails.name ||
    !props.customerDetails.email
  ) {
    alert("Missing required payment information");
    emit("payment-failed", { error: "Missing required payment information" });
    return;
  }

  // Get organized notes based on order type
  const paymentNotes = createPaymentNotes();

  const options = {
    key: "rzp_test_FztPn21izAOHeu", // Your Razorpay test key
    amount: Math.round(props.orderDetails.offerPrice * 100), // Amount in paisa (multiply by 100)
    currency: "INR",
    name: props.orderDetails.name,
    description: `${
      props.orderType === "campus_student" ? "CAMPUS" : "OUTSIDE"
    } - ${props.orderDetails.name} (${props.orderDetails.type})`,
    image: props.orderDetails.image,
    handler: function (response) {
      // Payment success handler
      console.log("Payment successful:", response);
      emit("payment-success", {
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id || null,
        signature: response.razorpay_signature || null,
        orderType: props.orderType,
        customerCategory: paymentNotes.customerCategory,
      });
    },
    prefill: {
      name: props.customerDetails.name || props.customerDetails.studentName,
      email: props.customerDetails.email,
      contact:
        props.customerDetails.whatsappNo ||
        props.customerDetails.whatsapp_number,
    },
    modal: {
      ondismiss: function () {
        console.log("Payment cancelled by user");
        emit("payment-cancelled");
      },
    },
    notes: paymentNotes,
    theme: {
      color: props.orderType === "campus_student" ? "#059669" : "#dc2626",
    },
  };

  try {
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      console.error("Payment failed:", response.error);
      emit("payment-failed", {
        error: response.error.description,
        code: response.error.code,
        reason: response.error.reason,
      });
    });
    paymentObject.open();
  } catch (error) {
    console.error("Razorpay initialization error:", error);
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
      <h3>Initializing Payment...</h3>
      <p>Please wait while we prepare your payment gateway.</p>
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped>
.payment-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: #f9fafb;
  border-radius: 12px;
  padding: 40px;
}

.payment-loading {
  text-align: center;
  color: #374151;
}

.payment-loading h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #059669;
}

.payment-loading p {
  margin-bottom: 20px;
  color: #6b7280;
}

.loader {
  border: 4px solid #e5e7eb;
  border-top: 4px solid #059669;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
