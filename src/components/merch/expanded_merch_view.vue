<script setup>
import { defineProps, defineEmits, ref } from "vue";
import BuyNowCampus from "./buyNowCampus.vue";
import BuyNowOutsideCampus from "./buy_now_outside_campus..vue";

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

const showCampusForm = ref(false);
const showOutsideForm = ref(false);

// Emit event when view more button is clicked
const emit = defineEmits(["view-more"]);
const handleViewMore = () => {
  emit("view-more", props);
};

const handleCampusStudentPurchase = () => {
  console.log("Campus student purchase for:", props.name);
  showCampusForm.value = true;
};

const handleBackFromCampusForm = () => {
  showCampusForm.value = false;
};

const handleBackFromOutsideForm = () => {
  showOutsideForm.value = false;
};

const handleFormSubmit = (orderData) => {
  console.log("Order submitted:", orderData);
  // Here you can handle the order submission (API call, etc.)

  // For now, just show success message and go back to expanded view
  if (orderData.orderType === "campus_student") {
    alert(`Order submitted successfully for ${orderData.student.studentName}!`);
    showCampusForm.value = false;
  } else if (orderData.orderType === "outside_campus") {
    alert(`Order submitted successfully for ${orderData.customer.name}!`);
    showOutsideForm.value = false;
  }
};

const handleOutsideStudentPurchase = () => {
  console.log("Outside campus student purchase for:", props.name);
  showOutsideForm.value = true;
};
</script>

<template>
  <!-- Campus Form View -->
  <div v-if="showCampusForm">
    <BuyNowCampus
      :name="props.name"
      :offerPrice="props.offerPrice"
      :originalPrice="props.originalPrice"
      :image="props.image"
      :type="props.type"
      :size="props.size"
      :description="props.description"
      @view-more="handleBackFromCampusForm"
      @form-submit="handleFormSubmit"
    />
  </div>

  <!-- Outside Campus Form View -->
  <div v-else-if="showOutsideForm">
    <BuyNowOutsideCampus
      :name="props.name"
      :offerPrice="props.offerPrice"
      :originalPrice="props.originalPrice"
      :image="props.image"
      :type="props.type"
      :size="props.size"
      :description="props.description"
      @view-more="handleBackFromOutsideForm"
      @form-submit="handleFormSubmit"
    />
  </div>

  <!-- Expanded Product View -->
  <div v-else class="expanded-view">
    <div class="product-container">
      <!-- Product Image Section -->
      <div class="image-section">
        <div class="product-image">
          <img :src="props.image" :alt="props.name" />
        </div>
      </div>

      <!-- Product Details Section -->
      <div class="details-section">
        <div class="product-header">
          <h1 class="product-name">{{ props.name }}</h1>
          <span class="product-type">{{ props.type.toUpperCase() }}</span>
        </div>

        <!-- Pricing Section -->
        <div class="pricing-section">
          <div class="price-row">
            <span class="current-price">₹{{ props.offerPrice }}</span>
            <span class="original-price">₹{{ props.originalPrice }}</span>
            <span class="discount-badge">
              {{
                Math.round(
                  ((props.originalPrice - props.offerPrice) /
                    props.originalPrice) *
                    100
                )
              }}% OFF
            </span>
          </div>
          <p class="savings">
            You save: ₹{{ (props.originalPrice - props.offerPrice).toFixed(2) }}
          </p>
        </div>

        <!-- Size Section -->
        <div class="size-section">
          <h3 class="section-title">Size</h3>
          <div class="size-display">
            <span class="size-badge">{{ props.size.toUpperCase() }}</span>
          </div>
        </div>

        <!-- Description Section -->
        <div class="description-section">
          <h3 class="section-title">Description</h3>
          <p class="description-text">{{ props.description }}</p>
        </div>

        <!-- Product Details Grid -->
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">Product Type:</span>
            <span class="detail-value">{{ props.type }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Available Size:</span>
            <span class="detail-value">{{ props.size.toUpperCase() }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Regular Price:</span>
            <span class="detail-value">₹{{ props.originalPrice }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Sale Price:</span>
            <span class="detail-value">₹{{ props.offerPrice }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-section">
          <button
            class="campus-student-btn"
            @click="handleCampusStudentPurchase"
          >
            Buy Now - IIT P Campus Student
          </button>
          <button
            class="outside-student-btn"
            @click="handleOutsideStudentPurchase"
          >
            Buy Now - Outside Campus Student
          </button>
          <button class="back-btn" @click="handleViewMore">
            Back to Products
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

.product-container {
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

.product-image {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.product-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* Details Section */
.details-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.product-header {
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 20px;
}

.product-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 10px 0;
  line-height: 1.2;
}

.product-type {
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
  margin: 0;
}

/* Size Section */
.size-section,
.description-section {
  padding: 20px 0;
  border-bottom: 1px solid #e5e7eb;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 15px 0;
}

.size-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.description-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4b5563;
  margin: 0;
}

/* Details Grid */
.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.detail-label {
  font-weight: 600;
  color: #6b7280;
  font-size: 0.9rem;
}

.detail-value {
  font-weight: 700;
  color: #1f2937;
  font-size: 1rem;
}

/* Action Buttons */
.action-section {
  display: flex;
  flex-direction: row;
  gap: 15px;
  padding-top: 20px;
}

.campus-student-btn,
.outside-student-btn,
.back-btn {
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  text-align: center;
}

.campus-student-btn {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  color: white;
}

.campus-student-btn:hover {
  background: linear-gradient(135deg, #047857 0%, #065f46 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
}

.outside-student-btn {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  color: white;
}

.outside-student-btn:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
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

  .product-container {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 20px;
  }

  .product-name {
    font-size: 2rem;
  }

  .current-price {
    font-size: 2rem;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .action-section {
    flex-direction: column;
  }
}
</style>
