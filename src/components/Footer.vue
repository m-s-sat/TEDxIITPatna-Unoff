<template>
  <footer class="footer">
    <!-- Rotated black square in top-left -->
    <div class="footer-left-square"></div>

    <!-- Main Footer Content -->
    <div class="footer-container">
      <!-- Left: Logo and TED info -->
      <div class="footer-section footer-left">
        <div class="footer-logo">
          <!-- <span class="red"><strong>TED</strong><sup>x</sup></span><span class="small">IITPatna</span> -->
          <!-- <p class="subtext"><span class="red">X</span> = independently organized TED event</p> -->
          <img src="@/assets/images/tedx_iitplogo2023.png" alt="TEDxIITPatna" class="logo" />
        </div>
        <ul class="footer-links">
          <li><a href="https://www.ted.com/" target="_blank">TED Website</a></li>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">About TEDx</a></li>
        </ul>
      </div>

      <!-- Center: Socials and Contact -->
      <div class="footer-section footer-center">
        <h2>Follow Us</h2>
        <div class="social-icons">
          <a href="https://www.instagram.com/tedxiitpatna/" target="_blank"><img src="@/assets/icons/instagram-icon-black.png" /></a>
          <a href="https://twitter.com/tedxiitpatna" target="_blank"><img src="@/assets/icons/twitter-icon-black.png" /></a>
          <a href="https://www.linkedin.com/company/tedxiitpatna" target="_blank"><img src="@/assets/icons/linkedin-icon-black.png" /></a>
          <a href="https://www.facebook.com/tedxiitpatna/" target="_blank"><img src="@/assets/icons/facebook-icon-black.png" /></a>
        </div>
        <a href="mailto:tedxiitpatna@gmail.com" class="email-link">tedxiitpatna@gmail.com</a>
        <hr class="footer-divider" />
        <h1 class="contact-us">Contact Us</h1>
      </div>

      <!-- Right: Quick Links -->
      <div class="footer-section footer-right">
        <h2>Quick Links</h2>
        <ul class="footer-links">
          <li><a href="#">About us</a></li>
          <li><a href="#">Speakers</a></li>
          <li><a href="#">Pre-event</a></li>
          <li><a href="#">Past events</a></li>
          <li><a href="#">Buy Tickets</a></li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="footer-bottom-row">
        <span>*This Independent TEDx Event Is Operated Under License From TED.</span>
        <span class="copyright">© 2025 TEDxIITPatna. All rights reserved.</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
@import '@/assets/css/footer.css';
</style>
