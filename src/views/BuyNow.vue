<script setup>
import { onMounted, ref } from "vue";
import LandingPage from "../components/merch/landing_page.vue";
import MerhItemCards from "../components/merch/merh_item_cards.vue";
import ExpandedMerchView from "../components/merch/expanded_merch_view.vue";
import TicketsShowPage from "../components/merch/tickets/tickets_show_page.vue";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
// App navigation state
const currentView = ref("landing"); // "landing", "merchandise", "tickets"
const items = ref([]);
const selectedItem = ref(null);
const showExpandedView = ref(false);

// Load merchandise data
onMounted(async () => {
  try {
    console.log("🔄 Fetching from API...");
    const response = await fetch("http://localhost:8000/api/merch");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("📦 API data received:", data);

    if (data && data.length > 0) {
      items.value = data;
      console.log(`✅ Loaded ${data.length} items from API`);
    } else {
      console.log("⚠️ API returned empty data, keeping mock data");
    }
  } catch (error) {
    console.error("❌ API Error:", error.message);
    console.log("📝 Using mock data");
  }
});

// Navigation handlers
const handleNavigateToMerch = () => {
  console.log("Navigating to merchandise");
  currentView.value = "merchandise";
  selectedItem.value = null;
  showExpandedView.value = false;
};

const handleNavigateToTickets = () => {
  console.log("Navigating to tickets");
  currentView.value = "tickets";
  selectedItem.value = null;
  showExpandedView.value = false;
};

const handleBackToLanding = () => {
  console.log("Returning to landing page");
  currentView.value = "landing";
  selectedItem.value = null;
  showExpandedView.value = false;
};

// Merchandise handlers
const handleViewMore = (itemData) => {
  console.log("Opening expanded view for:", itemData.name);
  selectedItem.value = itemData;
  showExpandedView.value = true;
};

const handleBackToList = () => {
  console.log("Returning to product list");
  selectedItem.value = null;
  showExpandedView.value = false;
};

// Ticket handlers
const handleBuyTicket = (ticketData) => {
  console.log("Ticket purchase initiated:", ticketData);
  // TODO: Implement ticket purchase flow
  alert(`Purchasing ticket: ${ticketData.name} for ₹${ticketData.offerPrice}`);
};
</script>

<template>
  <div class="app-wrapper">
    <!-- Landing Page View -->
    <div v-if="currentView === 'landing'">
      <Nav />
      <LandingPage
        @navigate-to-merch="handleNavigateToMerch"
        @navigate-to-tickets="handleNavigateToTickets"
      />
    </div>

    <!-- Merchandise Section -->
    <div v-else-if="currentView === 'merchandise'">
      <!-- Back to Landing Button -->
      <div class="nav-header">
        <button @click="handleBackToLanding" class="back-to-landing-btn">
          ← Back to Home
        </button>
        <h1 class="section-title">TEDx IIT Patna Merchandise</h1>
      </div>

      <!-- Merchandise List View -->
      <div v-if="!showExpandedView" class="app-container">
        <MerhItemCards
          v-for="item in items"
          :key="item.id"
          :name="item.name"
          :offerPrice="item.offerPrice"
          :originalPrice="item.originalPrice"
          :image="item.image"
          :type="item.type"
          :size="item.size"
          :description="item.description"
          @view-more="handleViewMore"
        />
      </div>

      <!-- Expanded Merchandise View -->
      <div v-if="showExpandedView && selectedItem">
        <ExpandedMerchView
          :name="selectedItem.name"
          :offerPrice="selectedItem.offerPrice"
          :originalPrice="selectedItem.originalPrice"
          :image="selectedItem.image"
          :type="selectedItem.type"
          :size="selectedItem.size"
          :description="selectedItem.description"
          @view-more="handleBackToList"
        />
      </div>
    </div>

    <!-- Tickets Section -->
    <div v-else-if="currentView === 'tickets'">
      <!-- Back to Landing Button -->
      <div class="nav-header">
        <button @click="handleBackToLanding" class="back-to-landing-btn">
          ← Back to Home
        </button>
        <h1 class="section-title">TEDx IIT Patna Tickets</h1>
      </div>

      <!-- Tickets Show Page -->
      <TicketsShowPage @buy-ticket="handleBuyTicket" />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background: #000000;
}

/* Navigation Header for Merchandise Section */
.nav-header {
  background: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.back-to-landing-btn {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.back-to-landing-btn:hover {
  background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

/* Merchandise Container */
.app-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
}

/* Coming Soon Section */
.coming-soon {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
}

.coming-soon-content {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

.coming-soon-content h1 {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.coming-soon-content p {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.back-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.back-btn:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

/* Smooth transitions */
.app-container,
.expanded-view,
.coming-soon {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-header {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .coming-soon-content {
    margin: 1rem;
    padding: 2rem;
  }

  .coming-soon-content h1 {
    font-size: 2rem;
  }
}
</style>
