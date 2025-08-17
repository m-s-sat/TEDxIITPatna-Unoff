<template>
  <Nav />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Poppins"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Molend"
  />
  <div class="theme-bg">
    <div class="photo">
      <img src="@/assets/images/home_theme_reveal.jpg" />
    </div>

    <div class="photo-mobile">
      <img src="@/assets/images/home_theme_reveal_mobile.png" />
    </div>

    <section class="speaker-application">
      <div class="title">Interested In Becoming a Speaker?</div>
      <a href="/contact-us" class="link">Contact Us</a>
    </section>

    <div class="sponsor">
      <h1 class="section-heading">OUR SPONSORS</h1>
      <div class="images">
        <img src="@/assets/images/sponsor_1.png" />
        <img src="@/assets/images/sponsor_2.png" />
      </div>
    </div>

    <div class="partner">
      <h1 class="section-heading">OUR PREVIOUS PARTNERS</h1>

      <!-- Row 1: 9 Images, Show 4 at a time -->
      <div class="scroll-row">
        <div class="scroll-track">
          <img src="@/assets/images/partner_1.png" />
          <img src="@/assets/images/partner_2.png" />
          <img src="@/assets/images/partner_3.png" />
          <img src="@/assets/images/partner_4.png" />
          <img src="@/assets/images/partner_5.png" />
          <img src="@/assets/images/partner_6.png" />
          <img src="@/assets/images/partner_7.jpg" />
          <img src="@/assets/images/partner_8.png" />
          <img src="@/assets/images/partner_9.png" />

          <!-- Duplicate for infinite scroll -->
          <img src="@/assets/images/partner_1.png" />
          <img src="@/assets/images/partner_2.png" />
          <img src="@/assets/images/partner_3.png" />
          <img src="@/assets/images/partner_4.png" />
          <img src="@/assets/images/partner_5.png" />
          <img src="@/assets/images/partner_6.png" />
          <img src="@/assets/images/partner_7.jpg" />
          <img src="@/assets/images/partner_8.png" />
          <img src="@/assets/images/partner_9.png" />
        </div>
      </div>

      <!-- Row 2: 9 Images, Show 3 at a time -->
      <div class="scroll-row">
        <div class="scroll-track">
          <img src="@/assets/images/partner_10.png" />
          <img src="@/assets/images/partner_11.png" />
          <img src="@/assets/images/partner_12.png" />
          <img src="@/assets/images/partner_13.png" />
          <img src="@/assets/images/partner_14.jpg" />
          <img src="@/assets/images/partner_15.png" />
          <img src="@/assets/images/partner_16.png" />
          <img src="@/assets/images/partner_17.png" />
          <img src="@/assets/images/partner_18.png" />
          <img src="@/assets/images/partner_19.png" />

          <!-- Duplicate for infinite scroll -->
          <img src="@/assets/images/partner_10.png" />
          <img src="@/assets/images/partner_11.png" />
          <img src="@/assets/images/partner_12.png" />
          <img src="@/assets/images/partner_13.png" />
          <img src="@/assets/images/partner_14.jpg" />
          <img src="@/assets/images/partner_15.png" />
          <img src="@/assets/images/partner_16.png" />
          <img src="@/assets/images/partner_17.png" />
          <img src="@/assets/images/partner_18.png" />
          <img src="@/assets/images/partner_19.png" />
        </div>
      </div>
    </div>

    <Footer />
  </div>

  <!-- <section :class="['speaker-application', this.screenWidth > 560 ? 'web' : 'mobile']">
    <div class="title">Interested in becoming a speaker?</div>
    <a href="https://forms.gle/jhDwBQmSFid4jjPZ6" target="_blank" class="link">Speaker Applications →</a>
  </section> -->
</template>

<script scoped>
// @ is an alias to /src
import Nav from "@/components/Nav.vue";
import HomeNav from "@/components/Home.Nav.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "HomeView",
  components: {
    Nav,
    Footer,
    HomeNav,
  },
  data() {
    return {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      showWebView: window.innerWidth >= 1.51 * window.innerHeight,

      countdownTarget: new Date("2022-09-03T00:00:00.000+05:30"), // target date for countdown
      displayDays: 0,
      displayHours: 0,
      _days: 60 * 60 * 24,
      _hours: 60 * 60,
    };
  },
  methods: {
    onResize() {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      this.showWebView = window.innerWidth >= 1.51 * window.innerHeight;
    },
    formatTime(val) {
      return val >= 10 ? String(val) : "0" + String(val);
    },
    countdownLogic(interval) {
      const now = new Date();
      const deltaT = Math.trunc(
        (this.countdownTarget.getTime() - now.getTime()) / 1000
      ); // in seconds

      if (deltaT < 0) {
        // closeInterval(interval)
        return;
      }

      const days = Math.trunc(deltaT / this._days);
      const hours = Math.trunc((deltaT - days * this._days) / this._hours);

      this.displayDays = days;
      this.displayHours = hours;
    },
  },
  created() {
    this.countdownLogic();
    const timer = setInterval(() => this.countdownLogic(timer), 1000);
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
@import "@/assets/css/home.css";
@import "@/assets/css/home.mobile.css";
</style>
<style scoped>
.theme-bg {
  background-color: #000000;
  overflow-x: hidden;
  color: white;
}
</style>
