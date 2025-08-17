<script setup>
import { defineProps, defineEmits, ref, computed } from "vue";
import TicketBuyForm from "./ticket_buy_form.vue";

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

const emit = defineEmits(["view-more", "buy-ticket"]);

// State for form visibility
const showBuyForm = ref(false);

// Computed properties
const hasDiscount = computed(
  () => props.originalPrice && props.originalPrice > props.offerPrice
);
const discountPercentage = computed(() => {
  if (!hasDiscount.value) return 0;
  return Math.round(
    ((props.originalPrice - props.offerPrice) / props.originalPrice) * 100
  );
});

const sessionBadgeText = computed(() => {
  switch (props.session_type) {
    case "1":
      return "Session 1";
    case "2":
      return "Session 2";
    case "full":
      return "Full Event";
    default:
      return "General";
  }
});

const sessionBadgeColor = computed(() => {
  switch (props.session_type) {
    case "1":
      return "session-1";
    case "2":
      return "session-2";
    case "full":
      return "full-event";
    default:
      return "general";
  }
});

const sessionDetails = computed(() => {
  switch (props.session_type) {
    case "1":
      return {
        title: "Morning Session",
        time: "9:00 AM - 12:30 PM",
        focus: "Innovation & Technology",
        speakers: "6-8 Speakers",
        includes: ["Welcome refreshments", "Networking break", "Q&A sessions"],
      };
    case "2":
      return {
        title: "Afternoon Session",
        time: "2:00 PM - 6:00 PM",
        focus: "Sustainability & Social Impact",
        speakers: "6-8 Speakers",
        includes: ["Afternoon tea", "Networking break", "Q&A sessions"],
      };
    case "full":
      return {
        title: "Complete Event Experience",
        time: "9:00 AM - 6:00 PM",
        focus: "Innovation, Technology, Sustainability & Social Impact",
        speakers: "12-16 Speakers",
        includes: [
          "Welcome refreshments",
          "Lunch & networking",
          "Afternoon tea",
          "All Q&A sessions",
          "Event swag bag",
          "Priority seating",
        ],
      };
    default:
      return {
        title: "TEDx Event",
        time: "TBA",
        focus: "Ideas Worth Spreading",
        speakers: "Multiple Speakers",
        includes: ["Event access"],
      };
  }
});

const isLimitedSeats = computed(
  () => props.available_seats !== null && props.max_seats !== null
);
const seatAvailabilityPercent = computed(() => {
  if (!isLimitedSeats.value) return 100;
  return (props.available_seats / props.max_seats) * 100;
});

const availabilityStatus = computed(() => {
  if (!isLimitedSeats.value) return "available";
  const percent = seatAvailabilityPercent.value;
  if (percent <= 0) return "sold-out";
  if (percent <= 20) return "limited";
  if (percent <= 50) return "moderate";
  return "available";
});

const priceValidUntil = computed(() => {
  try {
    const date = new Date(props.price_till);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return props.price_till;
  }
});

// Event handlers
const handleBack = () => emit("view-more", props);

const handleBuyTicket = () => {
  console.log("Opening ticket buy form for:", props.name);
  showBuyForm.value = true;
};

const handleBackFromForm = () => {
  console.log("Returning from buy form to ticket details");
  showBuyForm.value = false;
};

const handleFormSubmit = (ticketOrderData) => {
  console.log("Ticket order completed:", ticketOrderData);

  // Check if this is a payment completion (has payment data)
  if (ticketOrderData.payment) {
    // Payment was successful, show success message and emit to parent
    alert(
      `🎉 Ticket purchased successfully!\n\nPayment ID: ${ticketOrderData.payment.paymentId}\nTicket: ${ticketOrderData.ticket.name}\nCustomer: ${ticketOrderData.customer.name}`
    );

    // Emit the final buy-ticket event to parent component with complete data
    emit("buy-ticket", ticketOrderData);

    // Reset form state
    showBuyForm.value = false;
  } else {
    // This shouldn't happen with the new flow, but handle gracefully
    console.warn("Order data received without payment information");
    emit("buy-ticket", ticketOrderData);
    showBuyForm.value = false;
  }
};
</script>

<template>
  <div class="expanded-view">
    <!-- Ticket Buy Form View -->
    <div v-if="showBuyForm">
      <TicketBuyForm
        :name="props.name"
        :offer-price="props.offerPrice"
        :original-price="props.originalPrice"
        :image="props.image"
        :description="props.description"
        :price-till="props.price_till"
        :session-type="props.session_type"
        :event-date="props.event_date"
        :venue="props.venue"
        :available-seats="props.available_seats"
        :max-seats="props.max_seats"
        @view-more="handleBackFromForm"
        @form-submit="handleFormSubmit"
      />
    </div>

    <!-- Expanded Ticket Details View -->
    <div v-else class="ticket-container">
      <!-- Ticket Image Section -->
      <div class="image-section">
        <div class="ticket-image">
          <img :src="props.image" :alt="props.name" />
          <div class="session-badge" :class="sessionBadgeColor">
            {{ sessionBadgeText }}
          </div>
        </div>
      </div>

      <!-- Ticket Details Section -->
      <div class="details-section">
        <div class="ticket-header">
          <h1 class="ticket-name">{{ props.name }}</h1>
          <span class="event-type">{{
            sessionDetails.title.toUpperCase()
          }}</span>
        </div>

        <!-- Pricing Section -->
        <div class="pricing-section">
          <div class="price-row">
            <span class="current-price">₹{{ props.offerPrice }}</span>
            <span v-if="hasDiscount" class="original-price"
              >₹{{ props.originalPrice }}</span
            >
            <span v-if="hasDiscount" class="discount-badge"
              >{{ discountPercentage }}% OFF</span
            >
          </div>
          <p v-if="hasDiscount" class="savings">
            You save: ₹{{ (props.originalPrice - props.offerPrice).toFixed(2) }}
          </p>
          <p class="price-validity">
            The Price is valid till : {{ priceValidUntil }}
          </p>
        </div>

        <!-- Event Details Section -->

        <!-- Seat Availability Section -->
        <div v-if="isLimitedSeats" class="availability-section">
          <h3 class="section-title">Seat Availability</h3>
          <div class="availability-info">
            <div class="availability-header">
              <span class="availability-label">Seats Available</span>
              <span class="seat-count"
                >{{ props.available_seats }}/{{ props.max_seats }}</span
              >
            </div>
            <div class="availability-bar">
              <div
                class="availability-fill"
                :class="availabilityStatus"
                :style="{ width: `${seatAvailabilityPercent}%` }"
              ></div>
            </div>
            <div class="availability-status">
              <span
                v-if="availabilityStatus === 'sold-out'"
                class="status-text sold-out"
                >❌ Sold Out</span
              >
              <span
                v-else-if="availabilityStatus === 'limited'"
                class="status-text limited"
                >⚠️ Limited Seats - Book Now!</span
              >
              <span
                v-else-if="availabilityStatus === 'moderate'"
                class="status-text moderate"
                >📢 Filling Fast</span
              >
              <span v-else class="status-text available"
                >✅ Good Availability</span
              >
            </div>
          </div>
        </div>

        <!-- Description Section -->
        <div class="description-section">
          <h3 class="section-title">About This Ticket</h3>
          <p class="description-text">{{ props.description }}</p>
        </div>

        <!-- What's Included Section -->
        <div class="includes-section">
          <h3 class="section-title">What's Included</h3>
          <ul class="includes-list">
            <li
              v-for="item in sessionDetails.includes"
              :key="item"
              class="include-item"
            >
              <span class="include-icon">✓</span>
              <span class="include-text">{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="action-section">
          <button
            @click="handleBuyTicket"
            class="buy-ticket-btn"
            :disabled="availabilityStatus === 'sold-out'"
            :class="{ 'sold-out': availabilityStatus === 'sold-out' }"
          >
            <span v-if="availabilityStatus === 'sold-out'">Sold Out</span>
            <span v-else>🎫 Buy Ticket - ₹{{ props.offerPrice }}</span>
          </button>
          <button class="back-btn" @click="handleBack">
            ← Back to Tickets
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expanded-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f9fafb;
  min-height: 100vh;
}

.ticket-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Image Section */
.image-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ticket-image {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  position: relative;
}

.ticket-image img {
  width: 100%;
  height: auto;
  display: block;
}

.session-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.session-1 {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}
.session-2 {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}
.full-event {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
}
/* .general {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
} */

/* Details Section */
.details-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.ticket-header {
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 20px;
}

.ticket-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 10px 0;
  line-height: 1.2;
}

.event-type {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
}

/* Pricing Section */
.pricing-section {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  padding: 25px;
  border-radius: 12px;
  border-left: 4px solid #dc2626;
}

.price-row {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.current-price {
  font-size: 2.5rem;
  font-weight: 800;
  color: #dc2626;
}

.original-price {
  font-size: 1.5rem;
  color: #6b7280;
  text-decoration: line-through;
}

.discount-badge {
  background: #dc2626;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.savings {
  font-size: 1.1rem;
  color: #059669;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.price-validity {
  font-size: 0.9rem;
  color: #6b7280;
  font-style: italic;
  margin: 0;
}

/* Sections */
.event-details-section,
.availability-section,
.description-section,
.includes-section {
  padding: 20px 0;
  border-bottom: 1px solid #e5e7eb;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 15px 0;
}

.event-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
}

.detail-icon {
  font-size: 1.2rem;
  margin-top: 2px;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f2937;
}

/* Availability */
.availability-info {
  background: #f9fafb;
  padding: 20px;
  border-radius: 8px;
}

.availability-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.availability-label {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.seat-count {
  font-size: 1rem;
  color: #1f2937;
  font-weight: 700;
}

.availability-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.availability-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.availability-fill.available {
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
}
.availability-fill.moderate {
  background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
}
.availability-fill.limited {
  background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
}
.availability-fill.sold-out {
  background: linear-gradient(90deg, #6b7280 0%, #4b5563 100%);
}

.availability-status {
  text-align: center;
}

.status-text {
  font-size: 0.9rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 16px;
}

.status-text.available {
  color: #065f46;
  background: #d1fae5;
}
.status-text.moderate {
  color: #92400e;
  background: #fef3c7;
}
.status-text.limited {
  color: #991b1b;
  background: #fee2e2;
}
.status-text.sold-out {
  color: #374151;
  background: #f3f4f6;
}

/* Description */
.description-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4b5563;
  margin: 0;
}

/* Includes */
.includes-list {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.include-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.include-icon {
  color: #059669;
  font-weight: bold;
  font-size: 1.1rem;
}

.include-text {
  color: #4b5563;
  font-size: 0.95rem;
}

/* Action Buttons */
.action-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 20px;
}

.buy-ticket-btn,
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

.buy-ticket-btn {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  color: white;
}

.buy-ticket-btn:hover:not(.sold-out) {
  background: linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.buy-ticket-btn.sold-out {
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
  .expanded-view {
    padding: 10px;
  }

  .ticket-container {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 20px;
  }

  .ticket-name {
    font-size: 2rem;
  }

  .current-price {
    font-size: 2rem;
  }

  .event-details-grid {
    grid-template-columns: 1fr;
  }
}

.expanded-view {
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
