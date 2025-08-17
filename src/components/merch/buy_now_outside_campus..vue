<script setup>
import { defineProps, defineEmits, ref } from "vue";
import PaymentMerch from "./payment_Merch.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  offerPrice: {
    // paying price
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    // such as hoodie, tshirt, cap etc
    type: String,
    required: true,
  },
  size: {
    type: String, // s,m,l,xl,xxl
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Form data
const formData = ref({
  name: "",
  email: "",
  iitp_mail_id: "", // optional field
  whatsapp_number: "",
  address: "",
  city: "",
  state: "",
  street: "",
  pincode: "",
});

const showPayment = ref(false);

const emit = defineEmits(["view-more", "form-submit"]);

const handleBack = () => {
  emit("view-more", props);
};

const handleSubmit = () => {
  // Validate required fields (iitp_mail_id is optional)
  if (
    !formData.value.name ||
    !formData.value.email ||
    !formData.value.whatsapp_number ||
    !formData.value.address ||
    !formData.value.city ||
    !formData.value.state ||
    !formData.value.street ||
    !formData.value.pincode
  ) {
    alert("Please fill in all required fields");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.value.email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Validate pincode format (6 digits)
  const pincodeRegex = /^\d{6}$/;
  if (!pincodeRegex.test(formData.value.pincode)) {
    alert("Please enter a valid 6-digit pincode");
    return;
  }

  // Show payment component
  showPayment.value = true;
};

const handlePaymentSuccess = (paymentData) => {
  console.log("Payment successful:", paymentData);

  // Create complete order object
  const orderData = {
    product: {
      name: props.name,
      offerPrice: props.offerPrice,
      originalPrice: props.originalPrice,
      type: props.type,
      size: props.size,
      image: props.image,
      description: props.description,
    },
    customer: formData.value,
    payment: paymentData,
    orderType: "outside_campus",
  };

  alert(`Payment successful! Order confirmed for ${formData.value.name}`);

  // Emit form submission with payment data
  emit("form-submit", orderData);

  // Reset form and hide payment
  showPayment.value = false;
};

const handlePaymentFailed = (errorData) => {
  console.log("Payment failed:", errorData);
  alert("Payment failed. Please try again.");
  showPayment.value = false;
};

const handlePaymentCancelled = () => {
  console.log("Payment cancelled by user");
  showPayment.value = false;
};
</script>

<template>
  <!-- Payment Component -->
  <div v-if="showPayment">
    <PaymentMerch
      :order-details="{
        name: props.name,
        offerPrice: props.offerPrice,
        originalPrice: props.originalPrice,
        image: props.image,
        description: props.description,
        type: props.type,
        size: props.size,
      }"
      :customer-details="{
        name: formData.name,
        email: formData.email,
        whatsapp_number: formData.whatsapp_number,
        iitp_mail_id: formData.iitp_mail_id,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        street: formData.street,
        pincode: formData.pincode,
      }"
      :order-type="'outside_campus'"
      @payment-success="handlePaymentSuccess"
      @payment-failed="handlePaymentFailed"
      @payment-cancelled="handlePaymentCancelled"
    />
  </div>

  <!-- Outside Campus Form -->
  <div v-else class="outside-form-container">
    <div class="form-header">
      <h2>Outside Campus Student Order Form</h2>
      <div class="product-summary">
        <img :src="props.image" :alt="props.name" class="product-image" />
        <div class="product-details">
          <h3>{{ props.name }}</h3>
          <p class="product-type">
            {{ props.type.toUpperCase() }} - Size: {{ props.size }}
          </p>
          <div class="price-info">
            <span class="current-price">₹{{ props.offerPrice }}</span>
            <span class="original-price">₹{{ props.originalPrice }}</span>
          </div>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="outside-form">
      <div class="form-grid">
        <!-- Name Field -->
        <div class="form-group">
          <label for="name" class="form-label">Full Name *</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="form-input"
            placeholder="Enter your full name"
            required
          />
        </div>

        <!-- Email Field -->
        <div class="form-group">
          <label for="email" class="form-label">Email Address *</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="form-input"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <!-- IIT Patna Email Field (Optional) -->
        <div class="form-group">
          <label for="iitp_mail_id" class="form-label"
            >IIT Patna Email (Optional)</label
          >
          <input
            id="iitp_mail_id"
            v-model="formData.iitp_mail_id"
            type="email"
            class="form-input optional"
            placeholder="student@iitp.ac.in (if applicable)"
          />
          <small class="field-note"
            >If you are an IIT Patna alumnus or have an IIT Patna email</small
          >
        </div>

        <!-- WhatsApp Number Field -->
        <div class="form-group">
          <label for="whatsapp_number" class="form-label"
            >WhatsApp Number *</label
          >
          <input
            id="whatsapp_number"
            v-model="formData.whatsapp_number"
            type="tel"
            class="form-input"
            placeholder="+91 9876543210"
            required
          />
        </div>

        <!-- Street Address Field -->
        <div class="form-group full-width">
          <label for="street" class="form-label">Street Address *</label>
          <input
            id="street"
            v-model="formData.street"
            type="text"
            class="form-input"
            placeholder="House/Flat No., Street Name"
            required
          />
        </div>

        <!-- Full Address Field -->
        <div class="form-group full-width">
          <label for="address" class="form-label">Complete Address *</label>
          <textarea
            id="address"
            v-model="formData.address"
            class="form-textarea"
            placeholder="Enter your complete postal address including landmarks"
            rows="3"
            required
          ></textarea>
        </div>

        <!-- City Field -->
        <div class="form-group">
          <label for="city" class="form-label">City *</label>
          <input
            id="city"
            v-model="formData.city"
            type="text"
            class="form-input"
            placeholder="Enter your city"
            required
          />
        </div>

        <!-- State Field -->
        <div class="form-group">
          <label for="state" class="form-label">State *</label>
          <input
            id="state"
            v-model="formData.state"
            type="text"
            class="form-input"
            placeholder="Enter your state"
            required
          />
        </div>

        <!-- Pincode Field -->
        <div class="form-group">
          <label for="pincode" class="form-label">Pincode *</label>
          <input
            id="pincode"
            v-model="formData.pincode"
            type="text"
            class="form-input"
            placeholder="6-digit pincode"
            pattern="[0-9]{6}"
            maxlength="6"
            required
          />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="form-actions">
        <button type="button" @click="handleBack" class="btn-secondary">
          Back to Product
        </button>
        <button type="submit" class="btn-primary">
          Place Order - ₹{{ props.offerPrice }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.outside-form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9fafb;
  min-height: 100vh;
}

/* Form Header */
.form-header {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 20px 0;
  text-align: center;
}

/* Product Summary */
.product-summary {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #f3f4f6;
  border-radius: 8px;
  border-left: 4px solid #dc2626;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.product-details h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 5px 0;
}

.product-type {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0 0 10px 0;
  font-weight: 500;
}

.price-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #dc2626;
}

.original-price {
  font-size: 1.1rem;
  color: #6b7280;
  text-decoration: line-through;
}

/* Form Styling */
.outside-form {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.form-input,
.form-textarea {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: white;
}

.form-input.optional {
  border-color: #d1d5db;
  background-color: #f9fafb;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-input.optional:focus {
  border-color: #6b7280;
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.field-note {
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 4px;
  font-style: italic;
}

/* Required field styling */
.form-input:required:invalid {
  border-color: #ef4444;
}

.form-input:required:valid {
  border-color: #10b981;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 2px solid #e5e7eb;
}

.btn-primary,
.btn-secondary {
  flex: 1;
  padding: 15px 25px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.btn-secondary {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .outside-form-container {
    padding: 10px;
  }

  .form-header,
  .outside-form {
    padding: 20px;
  }

  .form-header h2 {
    font-size: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .product-summary {
    flex-direction: column;
    text-align: center;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}

/* Animation for form appearance */
.outside-form-container {
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
</style>
