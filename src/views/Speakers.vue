<template>
  <Nav></Nav>
  <div class="theme-bg">
    <!-- Desktop image -->
    <div class="photo">
      <img src="@/assets/images/speakers.png" />
      <h1 class="text">SPEAKERS</h1>
    </div>

    <!-- Mobile image -->
    <div class="photo-mobile">
      <img src="@/assets/images/speakers_mobile.png" />
      <h1 class="text">SPEAKERS</h1>
    </div>

    <!-- Desktop only year bar -->
    <div class="year-bar" ref="yearBar" :class="{ sticky: isSticky }">
      <div
        class="year"
        v-for="year in [2024, 2023, 2022, 2021, 2019]"
        :key="year"
        @click="scrollToYear(year)"
      >
        {{ year }}
      </div>
    </div>

    <!-- Speaker sections -->
    <div class="speakers-container">
      <div
        class="speakers-section"
        v-for="(yearGroup, i) in allYears"
        :key="i"
        :ref="`year-${yearGroup.year}`"
      >
        <!-- Desktop: non-clickable year label, Mobile: clickable with dropdown -->
        <div
          class="year-label"
          :class="{ clickable: isMobile }"
          @click="isMobile ? toggleYear(yearGroup.year) : null"
        >
          <span v-if="isMobile">
            {{ expandedYears.includes(yearGroup.year) ? "▴" : "▾" }}
            {{ yearGroup.year }}
          </span>
          <span v-else>
            {{ yearGroup.year }}
          </span>
        </div>

        <!-- Desktop: always show, Mobile: show based on expanded state -->
        <div
          class="speakers-bar"
          v-show="!isMobile || expandedYears.includes(yearGroup.year)"
        >
          <div
            class="speaker"
            v-for="(speaker, index) in yearGroup.speakers"
            :key="`${yearGroup.year}-${index}`"
          >
            <img :src="speaker.image" :alt="speaker.name" />
            <div class="speaker-overlay">
              <div class="speaker-info">
                <h3>{{ speaker.name }}</h3>
                <button
                  class="know-more-btn"
                  @click="selectedSpeaker = speaker"
                >
                  Know more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SpeakerModal
      v-if="selectedSpeaker"
      :speaker="selectedSpeaker"
      @close="selectedSpeaker = null"
    />

    <Footer />
  </div>
</template>

<script>
// import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import SpeakerModal from '@/components/SpeakerModal.vue'
import Nav from '@/components/Nav.vue'

export default {
  components: {
    Nav,
    Footer,
    SpeakerModal,
  },
  data() {
    return {
      selectedSpeaker: null,
      expandedYears: [2024], // show only 2024 by default on mobile
      isMobile: false,
      isSticky: false,
      yearBarOriginalTop: 0,
      allYears: [
        {
          year: 2024,
          speakers: [
            { name: 'Priyanka Tripathi', image: require('@/assets/images/priyanka.png'), title: 'The Importance of Literature in Life', description: 'Dr. Priyanka Tripathi is an Associate Professor of English at IIT Patna. Her research spans gender, caste, identity, and postcolonial literature, with over 160 publications. A former Visiting Fellow at the University of Edinburgh, she also serves as Co-Executive Editor of the Journal of International Women\'s Studies. Her work bridges storytelling and social justice, revealing literature\'s power to challenge and transform.', youtubeLink: 'https://youtu.be/CrtkHCf6lJ0', youtubeButton: true },
            { name: 'Swastika Rajput', image: require('@/assets/images/swastika.png'), title: 'Work, Fail, Repeat', description: 'Swastika Rajput is a captivating poet and storyteller who has built a significant online presence. With nearly 470,000 followers on Instagram and over 360,000 subscribers on YouTube, she inspires a large community through her poetry, podcasts, and personal narratives. Originally trained as a nurse, Swastika transitioned to freelance content creation, transforming her passion for writing and arts into a powerful journey of self-discovery and connection.', youtubeLink: 'https://youtu.be/M7UIV1r8nXk', youtubeButton: true },
            { name: 'Satyanshu Singh', image: require('@/assets/images/satyanshu.png'), title: 'Passion Over Pressure: Finding Purpose in Cinema and Connection', description: 'Satyanshu Singh is a National Award-winning filmmaker and educator. He directed Tamaash and Chintu Ka Birthday, wrote lyrics for Sulemani Keeda and Ferrari Ki Sawaari, teaches screenwriting, and is co-authoring a textbook, making him a leading figure in Indian cinema.', youtubeLink: 'https://youtu.be/5iAPyP2jnCQ', youtubeButton: true },
            { name: 'Pankaj Jha', image: require('@/assets/images/pankaj.png'), title: 'The Hidden Scripts of Life: Are You Living Your Truth?', description: 'Pankaj Jha is a versatile artist with a career of over two decades, captivating audiences in film, theater, and literature. An alumnus of the National School of Drama, he is known for nuanced performances in acclaimed films like "Monsoon Wedding," "Black Friday," and "Gulaal." Beyond acting, his talents include painting and poetry, with six solo exhibitions and notable literary works. His recent role as Vidhayak Ji in "Panchayat 2" has further cemented his reputation as a talented and versatile artist.', youtubeLink: 'https://youtu.be/LG36Hpr-F7k', youtubeButton: true },
            { name: 'Neha Agrawal', image: require('@/assets/images/neha.png'), title: '', description: 'Neha Agrawal is a prominent educator and an expert Math teacher for IIT JEE, with 16+ years of experience. Having taught over 5 million students and formerly a key figure at Ed-Techs like Byju\'s and Vedantu, she\'s also a celebrated TEDx Speaker. Her YouTube channel, \'Mathematically Inclined,\' inspires millions of aspiring engineers, bridging academic excellence with mass education.', youtubeLink: '', youtubeButton: false },
            { name: 'Manushi Ashok Jain', image: require('@/assets/images/manushi.png'), title: 'Reclaiming Urban Nature: Green Spaces for Climate Resilience', description: 'Manushi Ashok Jain is an accomplished Urban Designer at CP Kukreja Architects, renowned for shaping future-ready urban spaces. An alumna of CEPT University, she specializes in crafting sustainable and inclusive cities. Her expertise spans master planning, public realm design, and urban regeneration, contributing to transformative projects nationwide. Manushi\'s visionary approach blends innovative design with community-centric solutions for vibrant urban living.', youtubeLink: 'https://youtu.be/KVxLIsCjuK4', youtubeButton: true },
            { name: 'Arsh Goyal', image: require('@/assets/images/arsh.png'), title: 'Connect Tier-3 India to Global Opportunities', description: 'Arsh Goyal is a visionary tech leader and educator who blends technical expertise with teaching skills. A Gold Medallist from NIT Jalandhar, he is a Senior Software Engineer at Samsung India and a Data Scientist at ISRO. He links technology and education. With 200,000 YouTube and 450,000 Instagram followers, Arsh inspires future tech innovators.', youtubeLink: 'https://youtu.be/6hdmsHu8vVk', youtubeButton: true }
          ]
        },
        {
          year: 2023,
          speakers: [
            { name: 'Shikhar Goel', image: require('@/assets/images/shikhar.png'), title: 'Bytes for betterment', description: 'Shikhar Goel is the Chief Technology Officer at GeeksforGeeks, one of the world\'s leading platforms for computer science students and coding enthusiasts. A self-taught programmer, he joined GeeksforGeeks in 2016 and has since played a key role in shaping its growth. Shikhar is passionate about democratizing technical education and empowering the next generation of innovators and problem-solvers.',youtubeLink: 'https://youtu.be/3oInMZIFu-s', youtubeButton: true },
            { name: 'Deepti Asthana', image: require('@/assets/images/deepti.png'), title: 'The Weight of Water', description: 'Deepti Asthana is a documentary photographer and visual storyteller whose lens captures the everyday lives and unheard voices of women in rural India. Her work spans gender, culture, and environment, weaving intimate narratives that challenge stereotypes and spark dialogue.',youtubeLink: 'https://youtu.be/5fv5V28ZIRY', youtubeButton: true },
            { name: 'Anish Malpani', image: require('@/assets/images/anish.png'), title: 'Don\'t be an entreprenuer, until you\'re ready', description: 'Anish Malpani is the founder of Ashaya, a social enterprise turning difficult-to-recycle waste into premium products while uplifting waste-pickers. With a background in finance and social innovation, he blends business acumen with a deep commitment to sustainability and dignity of labour.',youtubeLink: 'https://youtu.be/pRyNvnZiAcU', youtubeButton: true },
            { name: 'Shreyasi Singh', image: require('@/assets/images/shreyasi.png'), title: 'Breaking Barriers: From Grief to Glory', description: 'Shreyasi Singh is an entrepreneur, author, and co-founder of Harappa Education. Passionate about lifelong learning, she has built platforms that blend academic rigour with practical skills, empowering professionals to thrive in a rapidly changing world.',youtubeLink: 'https://youtu.be/PPvYJWcErBw', youtubeButton: true },
            { name: 'Shradha Khapra', image: require('@/assets/images/shradha.png'), title: 'Dreams to Global Impact: Unleashing Potential through Education', description: 'Shradha Khapra, co-founder of Apna College, is a tech educator dedicated to making coding accessible and engaging for students across India. Her teaching combines clarity, relatability, and a drive to democratize technology education.',youtubeLink: 'https://youtu.be/uJDiBurD_YM', youtubeButton: true }
          ]
        },
        {
          year: 2022,
          speakers: [
            { name: 'Javed Khatri', image: require('@/assets/images/javed.png'), title: 'Stepping stones to success', description: 'Javed Khatri is a young entrepreneur and author whose novels explore contemporary themes with a gripping narrative style. Beyond writing, he engages in storytelling that reflects the aspirations and struggles of today\'s youth.', youtubeLink: 'https://youtu.be/UGj-KMkxzd0', youtubeButton: false },
            { name: 'Klanz', image: require('@/assets/images/klanz.png'), title: 'How I Became Klanz - the EDM Techno Boy', description: 'Kalyan Jyoti Kashyap, popularly known as KLÄNZ, is a 19-year-old trailblazing electronic musician from Assam. He uniquely blends modern electronic tracks with Indian classical instruments, creating an extraordinary sound. Rising to fame with hits like \'Baahi\' and \'Bohai\', KLÄNZ has established himself as a prominent figure in the new generation of Indian musicians. His innovative approach inspires by integrating diverse cultures into his captivating music.', youtubeLink: 'https://youtu.be/rXAGgVvHWp8', youtubeButton: true },
            { name: 'Alakh Pandey', image: require('@/assets/images/alakh.png'), title: 'Physics behind every growth', description: 'Alakh Pandey is a revolutionary ed-tech entrepreneur and educator, widely known as \'Physics Wallah\' for transforming competitive exam coaching. Starting from a YouTube channel, he built Physics Wallah into India\'s first ed-tech unicorn, democratizing high-quality education for millions. His mission-driven approach provides affordable, accessible learning in STEM, inspiring countless students nationwide and reshaping the educational landscape with his unique methodology.', youtubeLink: 'https://youtu.be/TzFS00kIQXs', youtubeButton: true },
            { name: 'Phani Tetali', image: require('@/assets/images/phani.png'), title: 'Diversity in perspectives - India from an artist\'s eye', description: 'Phani Tetali is a highly respected design expert and educator, deeply associated with IIT Bombay\'s Industrial Design Centre (IDC). With a career spanning significant contributions to design research and education, he has mentored countless students in product design and innovation. Phani\'s work at IIT Bombay has been instrumental in advancing design thinking and its practical applications within India\'s technological landscape, shaping future industry leaders.', youtubeLink: 'https://youtu.be/lMZpncCeuoY', youtubeButton: true },
            { name: 'N. Mahadevan', image: require('@/assets/images/mahadevan.png'), title: 'Dots and Affinities', description: 'Narayan Mahadevan is the dynamic CEO of BridgeLabz Solutions, a leading talent accelerator dedicated to bridging the industry\'s skill gap. With extensive experience in technology and talent development, he spearheads programs that transform engineers into job-ready professionals. Narayan\'s vision empowers fresh talent by providing cutting-edge training and guaranteed placements, significantly impacting India\'s tech workforce and fostering industry readiness.', youtubeLink: 'https://youtu.be/Lb4IUwxjn_8', youtubeButton: true },
            { name: 'S. Devarajan', image: require('@/assets/images/devarajan.png'), title: 'Through the straits of human attention', description: 'Dr. Sridharan Devarajan is an eminent Professor at the Indian Institute of Science (IISc) Bangalore, leading cutting-edge research in computational neuroscience. His work focuses on understanding brain function through interdisciplinary approaches, combining neuroscience, engineering, and data science. Dr. Devarajan\'s impactful contributions advance our comprehension of neural mechanisms, making him a pivotal figure in brain research and computational biology.', youtubeLink: 'https://youtu.be/j2_rdExSYqg', youtubeButton: true },
            { name: 'Sriparna Saha', image: require('@/assets/images/sriparna.png'), title: 'AI for the good', description: 'Dr. Sriparna Saha is a distinguished Professor in the Department of Computer Science and Engineering at IIT Patna. Her research focuses on cutting-edge areas including natural language processing, machine learning, and computational intelligence. Dr. Saha\'s extensive publications and significant contributions to AI research make her a leading academic voice, inspiring students and advancing knowledge in these critical technological fields.', youtubeLink: 'https://youtu.be/BfPw-NfddPI', youtubeButton: true }
          ]
        },
        {
          year: 2021,
          speakers: [
            { name: 'Zoya Agarwal', image: require('@/assets/images/zoya.png'), title: '', description: 'Captain Zoya Agarwal is a trailblazing Air India pilot and the youngest woman to command a Boeing-777. From historic polar route flights to humanitarian missions, her career embodies courage, leadership, and breaking barriers in aviation.', youtubeLink: '', youtubeButton: false },
            { name: 'Vivek Ram', image: require('@/assets/images/vivek.png'), title: 'Question Everything?', description: 'Vivek Ram is a digital artist and storyteller whose work in animation and visual design spans global studios and independent projects. Known for blending Indian mythological themes with contemporary aesthetics, he creates worlds that inspire wonder.', youtubeLink: 'https://youtu.be/bG4VLt6uVUc', youtubeButton: false },
            { name: 'Rupesh Mahore', image: require('@/assets/images/rupesh.png'), title: '', description: 'Rupesh Mahore is a grassroots innovator and educator whose work focuses on bringing technology and creative problem-solving to underserved communities. He bridges practical skills with local knowledge to foster self-reliance and opportunity.', youtubeLink: '', youtubeButton: false },
            { name: 'Rishi Raj', image: require('@/assets/images/rishi.png'), title: 'Finding your thrill', description: 'Rishi Raj is a Professor at IIT Patna with a PhD from University of Maryland. His research spans advanced materials, product design, and engineering education. Passionate about hands-on learning, he mentors students to think critically and build solutions for real-world challenges.', youtubeLink: 'https://youtu.be/HMvYMLkoShg', youtubeButton: false },
            { name: 'Darren Hood', image: require('@/assets/images/darren.png'), title: 'GARRISON OF EXCELLENCE - Enabling the lion within', description: 'Darren Hood is a seasoned UX professional, educator, and speaker with decades of experience designing human-centred digital experiences. He combines industry expertise with a passion for mentoring the next generation of designers.', youtubeLink: 'https://youtu.be/6INnG61FLag', youtubeButton: false },
            { name: 'Yusra Mardini', image: require('@/assets/images/yusra.png'), title: 'Stronger Together - A home for everyone', description: 'Yusra Mardini is an Olympic swimmer and UNHCR Goodwill Ambassador whose journey from Syrian refugee to global advocate for displaced youth inspires resilience and hope. Her story is a testament to the power of perseverance.', youtubeLink: 'https://youtu.be/xQ3gAIX6a7E', youtubeButton: false },
            { name: 'Rahul Aggarwal', image: require('@/assets/images/rahul.png'), title: '', description: 'Rahul Aggarwal is the co-founder of Designhill, a global creative marketplace. With a vision to connect businesses and designers worldwide, he champions entrepreneurship, creativity, and accessible design solutions.', youtubeLink: '', youtubeButton: false }
          ]
        },
        {
          year: 2019,
          speakers: [
            { name: 'Kaushalendra Kumar', image: require('@/assets/images/kaushalendra.png'), title: '', description: 'Kaushlendra Kumar is a visionary social entrepreneur and an IIM-Ahmedabad Gold Medallist who chose to revolutionize rural livelihoods over a corporate career. He founded Kaushalya Foundation and Knids Green Private Limited, empowering over 35,000 farmers in Bihar by creating efficient vegetable supply chains. His innovative models have uplifted countless rural communities, demonstrating a profound commitment to social and economic reform at the grassroots.', youtubeLink: '', youtubeButton: false },
            { name: 'Shams Aalam', image: require('@/assets/images/shams.png'), title: 'Empowering disabled through technology', description: 'Mohammad Shams Aalam Shaikh is an Indian Para Swimmer, a world record holder, and an inspiring advocate for accessibility. Diagnosed with paraplegia, he transformed adversity into triumph, holding a Limca Book record for the longest open-sea swim by a paraplegic. A recipient of the Best Sportsperson with Disability National Award by the President of India, Shams continues to break records and inspire millions with his resilience and dedication to sports and inclusion.', youtubeLink: 'https://youtu.be/LjuAimWKBjs', youtubeButton: true },
            { name: 'Anupam Jalote', image: require('@/assets/images/anupam.png'), title: '', description: 'Anupam Jalote is a distinguished entrepreneur and the founding CEO of iCreate, India\'s leading deep tech incubator. An MBA from Purdue, he leverages extensive corporate leadership experience from Bharti Airtel and Tata Communications. Anupam is renowned for fostering innovation in critical sectors like EVs, AI, and IoT, actively shaping India\'s vibrant entrepreneurial future.', youtubeLink: '', youtubeButton: false},
            { name: 'Tanvi Bhardwaj', image: require('@/assets/images/tanvi.png'), title: '', description: 'Tanvi Bhardwaj is a pioneering tech entrepreneur and the visionary Co-founder and CTO of MishiPay, a leading retail technology solution. With an engineering background, she architected MishiPay\'s innovative \'Scan, Pay & Go\' technology, transforming the retail checkout experience. Tanvi\'s leadership drives cutting-edge development, enabling seamless mobile self-checkout globally and reshaping the future of retail.', youtubeLink: '', youtubeButton: false },
            { name: 'Dr. Prashant Jha', image: require('@/assets/images/prashant.png'), title: '', description: 'Dr. Prashant Jha is a distinguished orthopedic surgeon at Orthoheal, renowned for his expertise in joint replacement and arthroscopic surgeries. With extensive experience in complex orthopaedic conditions, he is dedicated to restoring mobility and improving patients\' quality of life. Dr. Jha\'s patient-centric approach and advanced surgical skills make him a trusted figure in musculoskeletal care, contributing significantly to modern orthopaedics.', youtubeLink: '', youtubeButton: false }
          ]
        }
      ]
    }
  },
  mounted() {
    this.checkMobile();
    window.addEventListener("resize", this.checkMobile);
    window.addEventListener("scroll", this.handleScroll);

    // Set the original top position of year-bar
    this.$nextTick(() => {
      if (this.$refs.yearBar) {
        this.yearBarOriginalTop = this.$refs.yearBar.offsetTop - 73;
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkMobile);
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 767
    },
    toggleYear(year) {
      // If the clicked year is already expanded, collapse it
      if (this.expandedYears.includes(year)) {
        this.expandedYears = [];
      } else {
        // Otherwise, set only this year as expanded
        this.expandedYears = [year];
      }
    },
    scrollToYear(year) {
      if (!this.isMobile) {
        const yearElement = this.$refs[`year-${year}`];
        if (yearElement && yearElement[0]) {
          const yearBarHeight = this.$refs.yearBar
            ? this.$refs.yearBar.offsetHeight
            : 0;

          // Use different scroll values based on whether year-bar is currently sticky
          let offsetTop;
          if (this.isSticky) {
            // Year-bar is already sticky - use normal padding
            offsetTop = yearElement[0].offsetTop - yearBarHeight - 20 - 73
          } else {
            // Clicking from top when year-bar is not sticky - use more padding
            offsetTop = yearElement[0].offsetTop - yearBarHeight - 60 - 73
          }

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    },
    handleScroll() {
      if (!this.isMobile && this.$refs.yearBar) {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        // Check if we should stick the year-bar
        if (scrollTop >= this.yearBarOriginalTop + 305) {
          this.isSticky = true;
        } else {
          this.isSticky = false;
        }
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/speaker.css";
@import "@/assets/css/speaker.mobile.css";
</style>
