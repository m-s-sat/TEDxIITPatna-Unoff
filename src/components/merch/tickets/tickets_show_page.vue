<script setup>
import { onMounted, ref } from "vue";
import TicketCard from "./ticket_card.vue";
import ExpandedTicket from "./expanded_ticket.vue";

const tickets = ref([]);
const selectedTicket = ref(null);
const showExpandedView = ref(false);
const emit = defineEmits(["buy-ticket"]);

onMounted(async () => {
  try {
    console.log("🔄 Fetching tickets from API...");
    const response = await fetch("http://localhost:8000/api/tickets");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("📦 Tickets data received:", data);

    if (data && data.length > 0) {
      tickets.value = data;
      console.log(`✅ Loaded ${data.length} tickets from API`);
    } else {
    }
  } catch (error) {
    console.error("❌ API Error:", error.message);
    console.log("📝 Using mock data");
    // Mock data fallback
  }
});

const handleBuyTicket = (ticketData) => {
  console.log("Opening expanded view for ticket:", ticketData.name);
  selectedTicket.value = ticketData;
  showExpandedView.value = true;
};

const handleBackToList = () => {
  console.log("Returning to tickets list");
  selectedTicket.value = null;
  showExpandedView.value = false;
};

const handleFinalBuyTicket = (ticketData) => {
  console.log("Final ticket purchase initiated:", ticketData);
  emit("buy-ticket", ticketData);
};
</script>

<template>
  <div class="tickets-page">
    <!-- Expanded Ticket View -->
    <div v-if="showExpandedView && selectedTicket">
      <ExpandedTicket
        :name="selectedTicket.name"
        :offer-price="selectedTicket.offerPrice"
        :original-price="selectedTicket.originalPrice"
        :image="selectedTicket.image"
        :description="selectedTicket.description"
        :price-till="selectedTicket.price_till"
        :session-type="selectedTicket.session_type"
        :event-date="selectedTicket.event_date"
        :venue="selectedTicket.venue"
        :available-seats="selectedTicket.available_seats"
        :max-seats="selectedTicket.max_seats"
        @view-more="handleBackToList"
        @buy-ticket="handleFinalBuyTicket"
      />
    </div>

    <!-- Tickets List View -->
    <div v-else>
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">TEDx IIT Patna 2025 Tickets</h1>
        <p class="page-description">
          Join us for an inspiring day of ideas worth spreading. Choose your
          ticket type below.
        </p>
      </div>

      <!-- Tickets Grid -->
      <div class="tickets-container">
        <div v-if="tickets.length > 0" class="tickets-grid">
          <TicketCard
            v-for="ticket in tickets"
            :key="ticket.id"
            :name="ticket.name"
            :image="ticket.image"
            :offer-price="ticket.offerPrice"
            :original-price="ticket.originalPrice"
            :description="ticket.description"
            :price-till="ticket.price_till"
            :session-type="ticket.session_type"
            :event-date="ticket.event_date"
            :venue="ticket.venue"
            :available-seats="ticket.available_seats"
            :max-seats="ticket.max_seats"
            @buy-ticket="handleBuyTicket"
          />
        </div>
        <div v-else class="no-tickets">
          <div class="no-tickets-content">
            <h2>🎫 No Tickets Available</h2>
            <p>
              Tickets are not available at the moment. Please check back later!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tickets-page {
  min-height: 100vh;
  background: #000000;
  padding: 2rem;
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1rem;
}

.page-description {
  font-size: 1.1rem;
  color: #f3f3f3;
  line-height: 1.6;
}

/* Tickets Container */
.tickets-container {
  max-width: 1200px;
  margin: 0 auto 3rem auto;
}

.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  justify-items: center;
}

/* No Tickets State */
.no-tickets {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.no-tickets-content {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.no-tickets-content h2 {
  font-size: 1.8rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.no-tickets-content p {
  color: #6b7280;
  font-size: 1.1rem;
}

/* Event Information */
.event-info {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.info-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 500;
  color: #6b7280;
}

.info-value {
  font-weight: 600;
  color: #1f2937;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-list li {
  padding: 0.5rem 0;
  color: #6b7280;
  position: relative;
  padding-left: 1.5rem;
}

.info-list li::before {
  content: "•";
  color: #dc2626;
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .tickets-page {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .tickets-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .event-info {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .info-card {
    padding: 1.5rem;
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

.tickets-page {
  animation: fadeInUp 0.6s ease-out;
}
</style>
