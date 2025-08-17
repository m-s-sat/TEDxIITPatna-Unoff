<template>
  <div class="event-container-individual">
    <div class="year-container">
      {{ year }}
    </div>
    <div class="image-container">
      <img :src="image" alt="Event Image" />
    </div>
    <a
      class="explore-container"
      :href="`http://localhost:8080/pastevents/${year}`"
    >
      Explore &gt;&gt;
    </a>
  </div>
</template>

<script setup>
defineProps({
  year: String,
  image: String,
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Righteous&display=swap");

.event-container-individual {
  position: relative;
  width: 150px;
  height: 196px;
  border: 2.5px solid white;
  margin: 0;
  background-color: #000;
  font-family: "Righteous", sans-serif;
  overflow: visible;
}

.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.year-container {
  position: absolute;
  top: -14px;
  left: -12px;
  z-index: 10;
  padding: 2px 12px;
  color: white;
  font-size: 18px;
  background-color: #c62828;
  border-radius: 5px;
  transform: rotate(-8deg);
}

.explore-container {
  position: absolute;
  bottom: 15px;
  right: 15px;
  font-size: 12px;
  color: white;
  cursor: pointer;
}

.image-title-container {
  position: absolute;
  bottom: 55px;
  left: 50%;
  transform: translateX(-50%);
  width: 75%;
}

.image-title-container img {
  width: 100%;
  display: block;
}

@media (max-width: 480px) {
  .event-container-individual {
    width: 140px;
    height: 180px;
    margin: 0;
  }

  .year-container {
    font-size: 16px;
    padding: 2px 10px;
  }

  .explore-container {
    font-size: 11px;
    bottom: 12px;
    right: 12px;
  }

  .image-container img {
    object-fit: cover;
    object-position: center;
  }
}

@media (max-width: 430px) {
  .event-container-individual {
    width: 130px;
    height: 170px;
    margin: 0;
  }

  .year-container {
    font-size: 15px;
    padding: 2px 8px;
  }

  .explore-container {
    font-size: 10px;
    bottom: 10px;
    right: 10px;
  }

  .image-container img {
    object-fit: cover;
    object-position: center;
  }
}

@media (max-width: 360px) {
  .event-container-individual {
    width: 120px;
    height: 160px;
    margin: 0;
  }

  .year-container {
    font-size: 14px;
    padding: 1px 6px;
  }

  .explore-container {
    font-size: 9px;
    bottom: 8px;
    right: 8px;
  }

  .image-container img {
    object-fit: cover;
    object-position: center;
  }
}
</style>
