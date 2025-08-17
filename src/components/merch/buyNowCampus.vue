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
  studentName: "",
  rollNo: "",
  hostel: "",
  address: "",
  email: "",
  whatsappNo: "",
  programType: "",
  year: "",
});

const showPayment = ref(false);

const emit = defineEmits(["view-more", "form-submit"]);

const handleBack = () => {
  emit("view-more", props);
};

const handleSubmit = () => {
  // Validate form
  if (
    !formData.value.studentName ||
    !formData.value.rollNo ||
    !formData.value.email ||
    !formData.value.whatsappNo ||
    !formData.value.programType ||
    !formData.value.year
  ) {
    alert("Please fill in all required fields");
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
    student: formData.value,
    payment: paymentData,
    orderType: "campus_student",
  };

  alert(
    `Payment successful! Order confirmed for ${formData.value.studentName}`
  );

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
        name: formData.studentName,
        email: formData.email,
        whatsappNo: formData.whatsappNo,
        rollNo: formData.rollNo,
        address: formData.address,
        hostel: formData.hostel,
        programType: formData.programType,
        year: formData.year,
      }"
      :order-type="'campus_student'"
      @payment-success="handlePaymentSuccess"
      @payment-failed="handlePaymentFailed"
      @payment-cancelled="handlePaymentCancelled"
    />
  </div>

  <!-- Campus Form -->
  <div v-else class="campus-form-container">
    <div class="form-header">
      <h2>IIT P Campus Student Order Form</h2>
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

    <form @submit.prevent="handleSubmit" class="campus-form">
      <div class="form-grid">
        <!-- Name Field -->
        <div class="form-group">
          <label for="studentName" class="form-label">Full Name *</label>
          <input
            id="studentName"
            v-model="formData.studentName"
            type="text"
            class="form-input"
            placeholder="Enter your full name"
            required
          />
        </div>

        <!-- Roll Number Field -->
        <div class="form-group">
          <label for="rollNo" class="form-label">Roll Number *</label>
          <input
            id="rollNo"
            v-model="formData.rollNo"
            type="text"
            class="form-input"
            placeholder="2403CE04"
            required
          />
        </div>

        <!-- Hostel Field -->
        <div class="form-group">
          <label for="hostel" class="form-label">Hostel</label>
          <input
            id="hostel"
            v-model="formData.hostel"
            type="text"
            class="form-input"
            placeholder="Enter your hostel name"
          />
        </div>

        <!-- Address Field -->
        <div class="form-group full-width">
          <label for="address" class="form-label">Address</label>
          <textarea
            id="address"
            v-model="formData.address"
            class="form-textarea"
            placeholder="Enter your complete address"
            rows="3"
          ></textarea>
        </div>

        <!-- Email Field -->
        <div class="form-group">
          <label for="email" class="form-label">Email *</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="form-input"
            placeholder="student@iitpatna.ac.in"
            required
          />
        </div>

        <!-- WhatsApp Number Field -->
        <div class="form-group">
          <label for="whatsappNo" class="form-label">WhatsApp Number *</label>
          <input
            id="whatsappNo"
            v-model="formData.whatsappNo"
            type="tel"
            class="form-input"
            placeholder="+91 9876543210"
            required
          />
        </div>

        <!-- Program Type Field -->
        <div class="form-group">
          <label for="programType" class="form-label">Program Type *</label>
          <input
            id="programType"
            v-model="formData.programType"
            type="text"
            class="form-input"
            placeholder="e.g., B.Tech, M.Tech, PhD"
            required
          />
        </div>

        <!-- Year Field -->
        <div class="form-group">
          <label for="year" class="form-label">Year *</label>
          <input
            id="year"
            v-model="formData.year"
            type="text"
            class="form-input"
            placeholder="e.g., 1st Year, 2nd Year, PhD 3rd Year"
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
.campus-form-container {
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
  border-left: 4px solid #059669;
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
.campus-form {
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

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #059669;
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
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
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #047857 0%, #065f46 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
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
  .campus-form-container {
    padding: 10px;
  }

  .form-header,
  .campus-form {
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
.campus-form-container {
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
