<template>
  <div class="page-wrapper">
    <header class="page-header">
      <h1 class="page-title">
        <span class="title-highlight">OUR&nbsp;</span> JOURNEY
      </h1>
    </header>
    <div class="background-overlay"></div>
    <div class="content-container">
      <div class="red-line-container">
        <div class="year-line-container">
          <img src="../assets/our_journey_images/year-2024.png" class="year-img">
          <div class="red-line"></div>
        </div>
        <div class="year-line-container">
          <img src="../assets/our_journey_images/year-2023.png" class="year-img">
          <div class="red-line"></div>
        </div>
        <div class="year-line-container">
          <img src="../assets/our_journey_images/year-2022.png" class="year-img">
          <div class="red-line"></div>
        </div>
        <div class="year-line-container">
          <img src="../assets/our_journey_images/year-2021.png" class="year-img">
          <div class="red-line"></div>
        </div>
        <div class="year-line-container">
          <img src="../assets/our_journey_images/year-2019.png" class="year-img">
          <div class="red-line"></div>
        </div>
        <div class="year-line-container">
          <img src="../assets/our_journey_images/year-2016.png" class="year-img">
          <div class="red-line"></div>
        </div>
      </div>
      
      <div class="image-container">
        <img src="../assets/our_journey_images/Image-1.svg" class="event-image">
        <img src="../assets/our_journey_images/Image-2.svg" class="event-image">
        <img src="../assets/our_journey_images/Image-3.svg" class="event-image">
        <img src="../assets/our_journey_images/Image-4.svg" class="event-image">
        <img src="../assets/our_journey_images/Image-5.svg" class="event-image">
        <img src="../assets/our_journey_images/Image-6.svg" class="event-image">
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Footer from '@/components/Footer.vue';
</script>

<style>
/* Global Styles */
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  background-color: #000000;
  background-image: linear-gradient(to top, #4c0e0e, #000000 75%);
  min-height: 100vh;
}

/* Page Wrapper Styles */
.page-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

.content-container {
  position: relative;
  z-index: 10;
  margin-left: auto;
  margin-right: auto;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media (min-width: 640px) {
  .content-container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .content-container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.page-header {
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-title {
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  width: 100%;
  height: 527px;
  color: #ffffff;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5rem;
  box-shadow: inset 0px 0px 80px 40px rgba(0, 0, 0, 0.6);
  position: relative;
  z-index: 1;
}

.page-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, rgba(14, 1, 1, 0.6), rgba(0, 0, 0, 0.95)), url('../assets/our_journey_images/bg-image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(5px);
  z-index: -1; 
}

@media (min-width: 640px) {
  .page-title {
    font-size: 3rem;
    line-height: 1;
  }
}

@media (min-width: 1024px) {
  .page-title {
    font-size: 3.75rem;
    line-height: 1;
    padding-left: 8rem;
  }
}

.red-line-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.red-line {
  background-color: rgba(230, 3, 3, 1);
  width: 10px;
  height: 100%;
}

.image-container {
  display: flex;
  flex-direction: column;;
}

.year-line-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.year-img{
  position: absolute;
}

.event-image {
  width: 900px;
  height: 511px;
  margin-bottom: 2rem;
  margin-right: 10rem;
}
</style>