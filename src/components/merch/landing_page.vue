<script setup>
import { ref } from "vue";

// Navigation state
const activeSection = ref("home");

// Emit events for navigation
const emit = defineEmits(["navigate-to-merch", "navigate-to-tickets"]);

const navigateToMerch = () => {
  emit("navigate-to-merch");
};

const navigateToTickets = () => {
  emit("navigate-to-tickets");
};

// Hero section data
const heroData = {
  title: "TEDx IIT Patna",
  subtitle: "Ideas Worth Spreading",
  description:
    "Join us for an extraordinary experience of innovative ideas, inspiring talks, and meaningful connections.",
  date: "Coming Soon",
  venue: "IIT Patna Campus",
};

// Features data
const features = [
  {
    icon: "🎫",
    title: "Event Tickets",
    description: "Secure your spot at TEDx IIT Patna. Limited seats available.",
    action: "Get Tickets",
    actionType: "tickets",
  },
  {
    icon: "👕",
    title: "Official Merchandise",
    description:
      "Exclusive TEDx IIT Patna branded items. Hoodies, T-shirts, and more.",
    action: "Shop Now",
    actionType: "merch",
  },
];

// Stats data
const stats = [
  { number: "15+", label: "Inspiring Speakers" },
  { number: "500+", label: "Expected Attendees" },
  { number: "1", label: "Unforgettable Day" },
  { number: "∞", label: "Ideas to Explore" },
];
</script>

<template>
  <div class="landing-page">
    <!-- Features Section -->
    <section class="features-section">
      <div class="section-header">
        <h2 class="section-title">What We Offer</h2>
        <p class="section-description">
          Experience TEDx IIT Patna through our exclusive offerings
        </p>
      </div>

      <div class="features-grid">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="feature-card"
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <button
            @click="
              feature.actionType === 'tickets'
                ? navigateToTickets()
                : navigateToMerch()
            "
            class="feature-btn"
            :class="{
              'btn-tickets': feature.actionType === 'tickets',
              'btn-merch': feature.actionType === 'merch',
            }"
          >
            {{ feature.action }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.landing-page {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: #1f2937;
}

/* Header Styles */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e5e7eb;
  z-index: 1000;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  color: #dc2626;
}

.logo-subtitle {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover,
.nav-link.active {
  color: #dc2626;
}

.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 2px;
  background: #dc2626;
  border-radius: 1px;
}

/* Hero Section */
.hero-section {
  margin-top: 80px;
  min-height: 90vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
  padding: 2rem;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #dc2626;
  font-weight: 600;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.7;
}

.hero-info {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.info-value {
  font-size: 1.1rem;
  color: #1f2937;
  font-weight: 600;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-logo {
  text-align: center;
}

.tedx-logo {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.ted-part {
  color: #1f2937;
}

.x-part {
  color: #dc2626;
}

.event-tagline {
  font-size: 1.2rem;
  color: #6b7280;
  font-weight: 500;
}

/* Button Styles */
.btn {
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn.large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
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

.btn-outline {
  background: transparent;
  color: #dc2626;
  border: 2px solid #dc2626;
}

.btn-outline:hover {
  background: #dc2626;
  color: white;
  transform: translateY(-2px);
}

/* Features Section */
.features-section {
  padding: 5rem 2rem;
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.1rem;
  color: #6b7280;
  line-height: 1.7;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.feature-description {
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.feature-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-tickets {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  color: white;
}

.btn-tickets:hover {
  background: linear-gradient(135deg, #047857 0%, #065f46 100%);
  transform: translateY(-2px);
}

.btn-merch {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  color: white;
}

.btn-merch:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%);
  transform: translateY(-2px);
}

/* Stats Section */
.stats-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: white;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: #dc2626;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: #d1d5db;
  font-weight: 500;
}

/* About Section */
.about-section {
  padding: 5rem 2rem;
  background: #f9fafb;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2rem;
}

.about-description {
  font-size: 1.1rem;
  color: #6b7280;
  line-height: 1.7;
  margin-bottom: 3rem;
}

.about-highlights {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.highlight-icon {
  font-size: 1.5rem;
}

.highlight-text {
  font-weight: 600;
  color: #1f2937;
}

/* CTA Section */
.cta-section {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  color: white;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.7;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Footer */
.footer {
  background: #1f2937;
  color: white;
  padding: 3rem 2rem 1rem;
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #dc2626;
}

.footer-text {
  color: #d1d5db;
  margin-bottom: 0.5rem;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #dc2626;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #374151;
  color: #9ca3af;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-info {
    justify-content: center;
  }

  .tedx-logo {
    font-size: 3rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .about-highlights {
    gap: 1.5rem;
  }

  .highlight-item {
    flex-direction: column;
    text-align: center;
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .cta-actions .btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .nav-links {
    display: none;
  }

  .hero-title {
    font-size: 2rem;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }

  .about-highlights {
    flex-direction: column;
    align-items: center;
  }
}

/* Smooth Scroll */
html {
  scroll-behavior: smooth;
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

.feature-card,
.stat-item {
  animation: fadeInUp 0.6s ease-out;
}
</style>
