<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  offerPrice: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: false,
    default: null,
  },
  description: {
    type: String,
    required: true,
  },
  price_till: {
    type: String, // Changed to String for easier handling (ISO date string)
    required: true,
  },
  session_type: {
    // "1" for first session, "2" for second session, "full" for full event
    type: String,
    required: true,
  },
  event_date: {
    type: String,
    required: false,
    default: "Coming Soon",
  },
  venue: {
    type: String,
    required: false,
    default: "IIT Patna Campus",
  },
  available_seats: {
    type: Number,
    required: false,
    default: null,
  },
  max_seats: {
    type: Number,
    required: false,
    default: null,
  },
});

const emit = defineEmits(["buy-ticket"]);

// Computed properties
const hasDiscount = computed(() => {
  return props.originalPrice && props.originalPrice > props.offerPrice;
});

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

const isLimitedSeats = computed(() => {
  return props.available_seats !== null && props.max_seats !== null;
});

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

// Event handlers
const handleBuyTicket = () => {
  emit("buy-ticket", {
    name: props.name,
    offerPrice: props.offerPrice,
    originalPrice: props.originalPrice,
    image: props.image,
    description: props.description,
    session_type: props.session_type,
    event_date: props.event_date,
    venue: props.venue,
    price_till: props.price_till,
    available_seats: props.available_seats,
    max_seats: props.max_seats,
  });
};
</script>

<template>
  <div class="ticket-card">
    <!-- Ticket Header -->
    <div class="ticket-header">
      <div class="ticket-image">
        <img :src="props.image" :alt="props.name" />
        <div class="session-badge" :class="sessionBadgeColor">
          {{ sessionBadgeText }}
        </div>
      </div>
    </div>

    <!-- Ticket Content -->
    <div class="ticket-content">
      <!-- Event Name -->
      <h3 class="event-name">{{ props.name }}</h3>

      <!-- Event Details -->
      <div class="event-details">
        <!-- <div class="detail-item">
          <span class="detail-icon">📅</span>
          <span class="detail-text">{{ props.event_date }}</span>
        </div> -->
        <!-- <div class="detail-item">
          <span class="detail-icon">📍</span>
          <span class="detail-text">{{ props.venue }}</span>
        </div> -->
      </div>

      <!-- Description -->
      <p class="ticket-description">{{ props.description }}</p>

      <!-- Seat Availability -->
      <div v-if="isLimitedSeats" class="seat-availability">
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
          >
            ❌ Sold Out
          </span>
          <span
            v-else-if="availabilityStatus === 'limited'"
            class="status-text limited"
          >
            ⚠️ Limited Seats
          </span>
          <span
            v-else-if="availabilityStatus === 'moderate'"
            class="status-text moderate"
          >
            📢 Filling Fast
          </span>
          <span v-else class="status-text available"> ✅ Available </span>
        </div>
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
      </div>

      <!-- Action Button -->
      <div class="ticket-actions">
        <button
          @click="handleBuyTicket"
          class="buy-ticket-btn"
          :disabled="availabilityStatus === 'sold-out'"
          :class="{ 'sold-out': availabilityStatus === 'sold-out' }"
        >
          <span v-if="availabilityStatus === 'sold-out'"> Sold Out </span>
          <span v-else> 🎫 Buy Ticket - ₹{{ props.offerPrice }} </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticket-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  overflow: hidden;
  max-width: 400px;
  margin: 0 auto;
}

.ticket-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Ticket Header */
.ticket-header {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.ticket-image {
  position: relative;
  width: 100%;
  height: 100%;
}

.ticket-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.session-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
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

/* Ticket Content */
.ticket-content {
  padding: 1.5rem;
}

.event-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

/* Event Details */
.event-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-icon {
  font-size: 1rem;
}

.detail-text {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

/* Description */
.ticket-description {
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
}

/* Seat Availability */
.seat-availability {
  margin-bottom: 1.5rem;
}

.availability-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.availability-label {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.seat-count {
  font-size: 0.9rem;
  color: #1f2937;
  font-weight: 600;
}

.availability-bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.availability-fill {
  height: 100%;
  border-radius: 3px;
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
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
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

/* Pricing Section */
.pricing-section {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.price-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.current-price {
  font-size: 1.75rem;
  font-weight: 800;
  color: #dc2626;
}

.original-price {
  font-size: 1.1rem;
  color: #6b7280;
  text-decoration: line-through;
}

.discount-badge {
  background: #dc2626;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.price-validity {
  text-align: center;
}

.validity-text {
  font-size: 0.8rem;
  color: #6b7280;
  font-style: italic;
}

/* Action Button */
.ticket-actions {
  text-align: center;
}

.buy-ticket-btn {
  width: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.buy-ticket-btn:hover:not(.sold-out) {
  background: linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.buy-ticket-btn.sold-out {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  cursor: not-allowed;
  opacity: 0.7;
}

.buy-ticket-btn:disabled {
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 480px) {
  .ticket-card {
    max-width: 100%;
    margin: 0;
  }

  .ticket-content {
    padding: 1rem;
  }

  .event-name {
    font-size: 1.25rem;
  }

  .current-price {
    font-size: 1.5rem;
  }

  .event-details {
    flex-direction: column;
    gap: 0.25rem;
  }
}

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ticket-card {
  animation: fadeInUp 0.6s ease-out;
}
</style>
