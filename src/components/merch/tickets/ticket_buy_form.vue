<script setup>
import { defineProps, defineEmits, ref } from "vue";
import PaymentTicket from "./payment_ticket.vue";

const props = defineProps({
  name: { type: String, required: true },
  offerPrice: { type: Number, required: true },
  originalPrice: { type: Number, required: false, default: null },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price_till: { type: String, required: true },
  session_type: { type: String, required: true },
  event_date: { type: String, required: false, default: "Coming Soon" },
  venue: { type: String, required: false, default: "IIT Patna Campus" },
  available_seats: { type: Number, required: false, default: null },
  max_seats: { type: Number, required: false, default: null },
});

const emit = defineEmits(["view-more", "form-submit"]);

// Form data
const formData = ref({
  name: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  iitp_roll_no: "", // Optional field
  iitp_program_type: "", // Optional - BTech, MTech, PhD, etc.
  iitp_hostel: "", // Optional - Hostel name/address
});

// Validation
const errors = ref({});
const isSubmitting = ref(false);

// Payment state
const showPayment = ref(false);

// Validation functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

const validateAge = (age) => {
  const ageNum = parseInt(age);
  return !isNaN(ageNum) && ageNum >= 16 && ageNum <= 100;
};

const validateForm = () => {
  errors.value = {};

  // Required field validations
  if (!formData.value.name.trim()) {
    errors.value.name = "Name is required";
  }

  if (!formData.value.email.trim()) {
    errors.value.email = "Email is required";
  } else if (!validateEmail(formData.value.email)) {
    errors.value.email = "Please enter a valid email address";
  }

  if (!formData.value.phone.trim()) {
    errors.value.phone = "Phone number is required";
  } else if (!validatePhone(formData.value.phone)) {
    errors.value.phone = "Please enter a valid 10-digit Indian phone number";
  }

  if (!formData.value.age || formData.value.age.toString().trim() === "") {
    errors.value.age = "Age is required";
  } else if (!validateAge(formData.value.age)) {
    errors.value.age = "Age must be between 16 and 100";
  }

  if (!formData.value.gender) {
    errors.value.gender = "Gender is required";
  }

  return Object.keys(errors.value).length === 0;
};

// Event handlers
const handleBack = () => {
  emit("view-more", props);
};

const handleSubmit = () => {
  console.log("🔄 Form submission started...");
  console.log("📋 Form data:", formData.value);

  if (!validateForm()) {
    console.log("❌ Form validation failed:", errors.value);
    return;
  }

  isSubmitting.value = true;
  console.log("✅ Form validated successfully, proceeding to payment...");

  // Show payment component instead of emitting form data
  setTimeout(() => {
    console.log("🎯 Showing payment component...");
    showPayment.value = true;
    isSubmitting.value = false;
    console.log("✅ Payment component should now be visible");
  }, 1000);
};

// Payment event handlers
const handlePaymentSuccess = (paymentData) => {
  console.log("Payment successful:", paymentData);

  // Prepare complete order data for parent component
  const completeOrderData = {
    orderType: "ticket_purchase",
    ticket: {
      name: props.name,
      offerPrice: props.offerPrice,
      originalPrice: props.originalPrice,
      session_type: props.session_type,
      event_date: props.event_date,
      venue: props.venue,
    },
    customer: {
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone,
      age: parseInt(formData.value.age),
      gender: formData.value.gender,
      iitp_roll_no: formData.value.iitp_roll_no || null,
      iitp_program_type: formData.value.iitp_program_type || null,
      iitp_hostel: formData.value.iitp_hostel || null,
    },
    payment: paymentData,
  };

  // Emit the complete order data to parent component
  emit("form-submit", completeOrderData);
};

const handlePaymentFailed = (errorData) => {
  console.error("Payment failed:", errorData);
  showPayment.value = false;
  alert(`Payment failed: ${errorData.error}`);
};

const handlePaymentCancelled = () => {
  console.log("Payment cancelled by user");
  showPayment.value = false;
};

// Clear error when user starts typing
const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
};
</script>

<template>
  <div class="ticket-buy-form">
    <!-- Payment Component -->
    <div v-if="showPayment">
      <PaymentTicket
        :ticket-details="{
          name: props.name,
          offerPrice: props.offerPrice,
          originalPrice: props.originalPrice,
          session_type: props.session_type,
          event_date: props.event_date,
          venue: props.venue,
          image: props.image,
        }"
        :customer-details="{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          age: formData.age,
          gender: formData.gender,
          iitp_roll_no: formData.iitp_roll_no,
          iitp_program_type: formData.iitp_program_type,
          iitp_hostel: formData.iitp_hostel,
        }"
        @payment-success="handlePaymentSuccess"
        @payment-failed="handlePaymentFailed"
        @payment-cancelled="handlePaymentCancelled"
      />
    </div>

    <!-- Form Component -->
    <div v-else class="form-container">
      <!-- Ticket Summary Header -->
      <div class="ticket-summary">
        <div class="summary-image">
          <img :src="props.image" :alt="props.name" />
        </div>
        <div class="summary-details">
          <h2 class="ticket-title">{{ props.name }}</h2>
          <p class="ticket-price">₹{{ props.offerPrice }}</p>
          <p class="ticket-venue">{{ props.venue }} • {{ props.event_date }}</p>
        </div>
      </div>

      <!-- Customer Information Form -->
      <div class="form-section">
        <h3 class="section-title">Customer Information</h3>

        <form @submit.prevent="handleSubmit" class="customer-form">
          <!-- Name Field -->
          <div class="form-group">
            <label for="name" class="form-label">Full Name *</label>
            <input
              id="name"
              v-model="formData.name"
              @input="clearError('name')"
              type="text"
              class="form-input"
              :class="{ error: errors.name }"
              placeholder="Enter your full name"
              required
            />
            <span v-if="errors.name" class="error-message">{{
              errors.name
            }}</span>
          </div>

          <!-- Email Field -->
          <div class="form-group">
            <label for="email" class="form-label">Email Address *</label>
            <input
              id="email"
              v-model="formData.email"
              @input="clearError('email')"
              type="email"
              class="form-input"
              :class="{ error: errors.email }"
              placeholder="Enter your email address"
              required
            />
            <span v-if="errors.email" class="error-message">{{
              errors.email
            }}</span>
          </div>

          <!-- Phone Field -->
          <div class="form-group">
            <label for="phone" class="form-label">Phone Number *</label>
            <input
              id="phone"
              v-model="formData.phone"
              @input="clearError('phone')"
              type="tel"
              class="form-input"
              :class="{ error: errors.phone }"
              placeholder="Enter your 10-digit phone number"
              maxlength="10"
              required
            />
            <span v-if="errors.phone" class="error-message">{{
              errors.phone
            }}</span>
          </div>

          <!-- Age and Gender Row -->
          <div class="form-row">
            <!-- Age Field -->
            <div class="form-group">
              <label for="age" class="form-label">Age *</label>
              <input
                id="age"
                v-model="formData.age"
                @input="clearError('age')"
                type="number"
                class="form-input"
                :class="{ error: errors.age }"
                placeholder="Age"
                min="16"
                max="100"
                required
              />
              <span v-if="errors.age" class="error-message">{{
                errors.age
              }}</span>
            </div>

            <!-- Gender Field -->
            <div class="form-group">
              <label for="gender" class="form-label">Gender *</label>
              <select
                id="gender"
                v-model="formData.gender"
                @change="clearError('gender')"
                class="form-select"
                :class="{ error: errors.gender }"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              <span v-if="errors.gender" class="error-message">{{
                errors.gender
              }}</span>
            </div>
          </div>

          <!-- IIT Patna Roll Number (Optional) -->
          <div class="form-group">
            <label for="iitp_roll_no" class="form-label">
              IIT Patna Roll Number
              <span class="optional-text">(Optional)</span>
            </label>
            <input
              id="iitp_roll_no"
              v-model="formData.iitp_roll_no"
              type="text"
              class="form-input"
              placeholder="Enter your IIT Patna roll number (if applicable)"
            />
            <p class="field-help">
              Only fill this if you are a current IIT Patna student
            </p>
          </div>

          <!-- IIT Patna Program Type (Optional) -->
          <div class="form-group">
            <label for="iitp_program_type" class="form-label">
              IIT Patna Program Type
              <span class="optional-text">(Optional)</span>
            </label>
            <input
              id="iitp_program_type"
              v-model="formData.iitp_program_type"
              type="text"
              class="form-input"
              placeholder="e.g., B.Tech CSE, M.Tech EE, Ph.D ME, etc."
            />
            <p class="field-help">
              Enter your program type if you are an IIT Patna student/alumni
              (e.g., "B.Tech Computer Science", "M.Tech Electrical", "Ph.D
              Mechanical")
            </p>
          </div>

          <!-- IIT Patna Hostel (Optional) -->
          <div class="form-group">
            <label for="iitp_hostel" class="form-label">
              IIT Patna Hostel/Address
              <span class="optional-text">(Optional)</span>
            </label>
            <input
              id="iitp_hostel"
              v-model="formData.iitp_hostel"
              type="text"
              class="form-input"
              placeholder="Enter your hostel name or campus address (if applicable)"
            />
            <p class="field-help">
              For current students: Enter hostel name (e.g., "Aryabhatta
              Hostel"). For others: Leave blank
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <button
              type="submit"
              class="submit-btn"
              :disabled="isSubmitting"
              :class="{ submitting: isSubmitting }"
            >
              <span v-if="isSubmitting">Processing...</span>
              <span v-else
                >🎫 Proceed to Payment - ₹{{ props.offerPrice }}</span
              >
            </button>

            <button type="button" @click="handleBack" class="back-btn">
              ← Back to Ticket Details
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticket-buy-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9fafb;
  min-height: 100vh;
}

.form-container {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Ticket Summary */
.ticket-summary {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  border-radius: 12px;
  border-left: 4px solid #dc2626;
  margin-bottom: 30px;
}

.summary-image {
  width: 120px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.summary-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.summary-details {
  flex: 1;
}

.ticket-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.ticket-price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #dc2626;
  margin: 0 0 8px 0;
}

.ticket-venue {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

/* Form Section */
.form-section {
  margin-top: 30px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 25px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #e5e7eb;
}

.customer-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Form Groups */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 8px;
}

.optional-text {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 400;
}

.form-input,
.form-select {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-input.error,
.form-select.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-message {
  font-size: 0.8rem;
  color: #ef4444;
  font-weight: 500;
}

.field-help {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0;
  font-style: italic;
}

/* Action Buttons */
.form-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.submit-btn,
.back-btn {
  padding: 15px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.submit-btn {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  color: white;
}

.submit-btn:hover:not(.submitting):not(:disabled) {
  background: linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.submit-btn.submitting,
.submit-btn:disabled {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  cursor: not-allowed;
  opacity: 0.7;
}

.back-btn {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
}

.back-btn:hover {
  background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .ticket-buy-form {
    padding: 10px;
  }

  .form-container {
    padding: 20px;
  }

  .ticket-summary {
    flex-direction: column;
    gap: 15px;
  }

  .summary-image {
    width: 100%;
    height: 120px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .form-actions {
    flex-direction: column;
  }
}

/* Animation */
.ticket-buy-form {
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
