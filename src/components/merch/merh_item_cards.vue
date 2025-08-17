<script setup>
import { defineProps, defineEmits } from "vue";

// Define props for the component
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

// Emit event when view more button is clicked
const emit = defineEmits(["view-more"]);

const handleViewMore = () => {
  emit("view-more", props);
};
</script>

<template>
  <div class="item-card">
    <div class="card-image">
      <img :src="props.image" :alt="props.name" />
    </div>

    <div class="card-content">
      <h3 class="item-name">{{ props.name }}</h3>
      <p class="item-size">Size: {{ props.size }}</p>
      <div class="price-container">
        <span class="offer-price">₹{{ props.offerPrice }}</span>
        <span class="original-price">₹{{ props.originalPrice }}</span>
      </div>

      <button class="view-more-btn" @click="handleViewMore">View More</button>
    </div>
  </div>
</template>

<style scoped>
.item-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 300px;
  margin: 16px;
}

.item-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.item-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 20px;
  text-align: center;
}

.item-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.item-size {
  font-size: 0.9rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 0 0 16px 0;
}

.offer-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #dc2626;
}

.original-price {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  text-decoration: line-through;
}

.view-more-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  font-size: 1rem;
}

.view-more-btn:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.view-more-btn:active {
  transform: translateY(0);
}

/* Responsive design */
@media (max-width: 768px) {
  .item-card {
    max-width: 280px;
    margin: 12px;
  }

  .card-content {
    padding: 16px;
  }

  .item-name {
    font-size: 1.1rem;
  }

  .item-size {
    font-size: 0.85rem;
  }

  .view-more-btn {
    padding: 10px 20px;
    font-size: 0.95rem;
  }

  .offer-price {
    font-size: 1.1rem;
  }

  .original-price {
    font-size: 0.9rem;
  }
}
</style>
