<template>
  <div
    class="contact-page-wrapper"
    :class="{ 'modal-open-background': isPartnerFormVisible }"
  >
    <div class="heading-container">
      <p>Any questions or remarks? Just leave us a message!</p>
    </div>
    <div class="form-other-container">
      <div class="partner-contactus-form">
        <div class="partner-container">
          <div class="description-1">
            Have an idea to collaborate or support our next edition?
          </div>
          <div class="description-2">
            <span class="main-word">TEDxIITPatna</span> thrives on meaningful
            partnerships — let’s create something impactful together.
          </div>
          <button @click="openPartnerForm" class="button-container">
            Partner with Us
          </button>
        </div>
        <div class="line-container"></div>
        <form
          class="contact-form-container"
          @submit.prevent="handleContactSubmit"
        >
          <div class="contact-input-group">
            <label for="contact-name" class="contact-label">Name</label>
            <input
              type="text"
              id="contact-name"
              placeholder="Enter your name"
              class="contact-custom-input"
              v-model="contactForm.name"
            />
          </div>
          <div class="contact-input-group">
            <label for="contact-email" class="contact-label">Email</label>
            <input
              type="email"
              id="contact-email"
              placeholder="Enter your e-mail address"
              class="contact-custom-input"
              v-model="contactForm.email"
            />
          </div>
          <div class="contact-textarea-group">
            <textarea
              name="message"
              class="contact-custom-textarea"
              placeholder="Leave your message here..."
              v-model="contactForm.suggestion"
            ></textarea>
          </div>
          <button type="submit" class="button-container">Submit</button>
        </form>
      </div>
    </div>

    <div v-if="isPartnerFormVisible" class="modal-overlay">
      <div class="form-card">
        <button
          @click="closePartnerForm"
          class="close-button"
          aria-label="Close form"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="close-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div class="form-content">
          <div class="header">
            <h1 class="header-title font-garamond">Partner with TEDx</h1>
            <p class="header-description">
              We're excited to collaborate with organizations and individuals
              who align with the TEDx spirit.
            </p>
          </div>
          <form
            @submit.prevent="handlePartnerSubmit"
            class="form-container-modal"
          >
            <fieldset class="form-section">
              <legend class="section-title font-garamond">
                Organization / Individual Info
              </legend>
              <div class="input-group">
                <label for="partner-name" class="form-label"
                  >Name of Organization / Individual</label
                >
                <input
                  v-model="partnerForm.name"
                  type="text"
                  id="partner-name"
                  class="form-input"
                  :class="{ 'input-error': partnerFormErrors.name }"
                  placeholder="Enter your name"
                />
                <div v-if="partnerFormErrors.name" class="error-message">
                  {{ partnerFormErrors.name }}
                </div>
              </div>
              <div class="input-group">
                <label for="partner-portfolio" class="form-label"
                  >Website / Portfolio / Social Handle</label
                >
                <input
                  v-model="partnerForm.portfolio"
                  type="text"
                  id="partner-portfolio"
                  class="form-input"
                  :class="{ 'input-error': partnerFormErrors.portfolio }"
                  placeholder="https://yourwebsite.com"
                />
                <div v-if="partnerFormErrors.portfolio" class="error-message">
                  {{ partnerFormErrors.portfolio }}
                </div>
              </div>
              <div class="input-group">
                <label for="partner-industry" class="form-label"
                  >Industry / Area of Work</label
                >
                <input
                  v-model="partnerForm.industry"
                  type="text"
                  id="partner-industry"
                  class="form-input"
                  :class="{ 'input-error': partnerFormErrors.industry }"
                  placeholder="e.g., Media, Education, Tech"
                />
                <div v-if="partnerFormErrors.industry" class="error-message">
                  {{ partnerFormErrors.industry }}
                </div>
              </div>
            </fieldset>
            <fieldset class="form-section">
              <legend class="section-title font-garamond">
                Contact Details
              </legend>
              <div class="input-group">
                <label for="partner-email" class="form-label"
                  >Email Address</label
                >
                <input
                  v-model="partnerForm.email"
                  type="email"
                  id="partner-email"
                  class="form-input"
                  :class="{ 'input-error': partnerFormErrors.email }"
                  placeholder="you@example.com"
                />
                <div v-if="partnerFormErrors.email" class="error-message">
                  {{ partnerFormErrors.email }}
                </div>
              </div>
              <div class="input-group">
                <label for="partner-phone" class="form-label"
                  >Phone Number</label
                >
                <input
                  v-model="partnerForm.phone"
                  type="tel"
                  id="partner-phone"
                  class="form-input"
                  :class="{ 'input-error': partnerFormErrors.phone }"
                  placeholder="Enter your phone number"
                />
                <div v-if="partnerFormErrors.phone" class="error-message">
                  {{ partnerFormErrors.phone }}
                </div>
              </div>
            </fieldset>
            <fieldset class="form-section">
              <legend class="section-title font-garamond">
                Nature of Partnership
              </legend>
              <div class="input-group">
                <label for="partner-type" class="form-label"
                  >Type of Partnership</label
                >
                <input
                  v-model="partnerForm.partnershipType"
                  type="text"
                  id="partner-type"
                  class="form-input"
                  :class="{ 'input-error': partnerFormErrors.partnershipType }"
                  placeholder="Sponsorship, In-Kind Support, etc."
                />
                <div
                  v-if="partnerFormErrors.partnershipType"
                  class="error-message"
                >
                  {{ partnerFormErrors.partnershipType }}
                </div>
              </div>
              <div class="input-group">
                <label for="partner-proposal" class="form-label"
                  >Brief Description of Your Proposal</label
                >
                <textarea
                  v-model="partnerForm.proposal"
                  id="partner-proposal"
                  rows="5"
                  class="form-input form-textarea"
                  :class="{ 'input-error': partnerFormErrors.proposal }"
                  placeholder="Tell us how you'd like to contribute..."
                ></textarea>
                <div v-if="partnerFormErrors.proposal" class="error-message">
                  {{ partnerFormErrors.proposal }}
                </div>
              </div>
            </fieldset>
            <div class="submit-container">
              <button type="submit" class="submit-button">
                Submit Proposal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="opendialog" class="alert-box-overlay">
      <div class="alert-box-main-container">
        <div class="alert-box-description-warning">
          <div class="alert-box-description">
            Submission {{ submission.keyword }}
          </div>
          <div class="alert-box-warning">
            {{ submission.description }}
          </div>
        </div>
        <div class="alert-box-button" @click="opendialog = false">
          {{ submission.error ? "Go Back" : "Back to Home" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const isPartnerFormVisible = ref(false);
const partnerForm = ref({
  name: "",
  portfolio: "",
  industry: "",
  email: "",
  phone: "",
  partnershipType: "",
  proposal: "",
});
const partnerFormErrors = ref({});

const contactForm = ref({
  name: "",
  email: "",
  suggestion: "",
});

const opendialog = ref(false);
const submission = ref({ error: false, description: "", keyword: "" });

const openPartnerForm = () => {
  isPartnerFormVisible.value = true;
};

const closePartnerForm = () => {
  isPartnerFormVisible.value = false;
  partnerFormErrors.value = {};
};

watch(isPartnerFormVisible, (newValue) => {
  if (newValue) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

const validatePartnerForm = () => {
  const errors = {};
  if (!partnerForm.value.name) errors.name = "Name is required.";
  if (!partnerForm.value.portfolio) errors.portfolio = "Portfolio is required.";
  if (!partnerForm.value.industry) errors.industry = "Industry is required.";
  if (!partnerForm.value.email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(partnerForm.value.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!partnerForm.value.phone) errors.phone = "Phone number is required.";
  if (!partnerForm.value.partnershipType)
    errors.partnershipType = "Type of partnership is required.";
  if (!partnerForm.value.proposal)
    errors.proposal = "Proposal description is required.";

  partnerFormErrors.value = errors;
  return Object.keys(errors).length === 0;
};

// const handlePartnerSubmit = () => {
//   if (validatePartnerForm()) {
//     console.log("Partner Form Submitted:", partnerForm.value);
//     alert("Thank you for your partnership proposal!");
//     closePartnerForm();
//     partnerForm.value = {
//       name: "",
//       portfolio: "",
//       industry: "",
//       email: "",
//       phone: "",
//       partnershipType: "",
//       proposal: "",
//     };
//   }
// };
const handlePartnerSubmit = async () => {
  if (validatePartnerForm()) {
    try {
      // Map frontend fields to backend expected fields
      const payload = {
        nameOfOrganization_or_Individual: partnerForm.value.name,
        websiteOrPortfolioOrSocialMediaLink: partnerForm.value.portfolio,
        industryOrAreaOfWork: partnerForm.value.industry,
        email: partnerForm.value.email,
        phoneNumber: partnerForm.value.phone,
        industryOrAreaOfWork_natureOfPathnerShip:
          partnerForm.value.partnershipType,
        briefDescriptionOfPathnerShip: partnerForm.value.proposal,
      };

      const response = await fetch(
        "http://localhost:8000/api/partnerWithUs",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {'content-type':'application/json'}
        }
      );

      if (response.status === 201) {
        alert("Thank you for your partnership proposal!");
        closePartnerForm();
        partnerForm.value = {
          name: "",
          portfolio: "",
          industry: "",
          email: "",
          phone: "",
          partnershipType: "",
          proposal: "",
        };
      } else {
        alert("There was an issue submitting your proposal. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting partnership proposal:", error);
      alert(
        "There was an error submitting your proposal. Please try again later."
      );
    }
  }
};

// const handleContactSubmit = async () => {
//   try {
//     const response = await axios.post(
//       "http://localhost:3000/api/contactUs",
//       contactForm.value
//     );
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
//   if (contactForm.value.name.trim() === "") {
//     submission.value = {
//       error: true,
//       description: "Please write your name!",
//       keyword: "Error",
//     };
//     opendialog.value = true;
//     return;
//   }
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (contactForm.value.email.trim() === "") {
//     submission.value = {
//       error: true,
//       description: "Please write your email!",
//       keyword: "Error",
//     };
//     opendialog.value = true;
//     return;
//   } else if (!emailRegex.test(contactForm.value.email)) {
//     submission.value = {
//       error: true,
//       description: "Please enter a valid email address.",
//       keyword: "Error",
//     };
//     opendialog.value = true;
//     return;
//   }
//   console.log("Contact Form Submitted:", contactForm.value);
//   submission.value = {
//     error: false,
//     keyword: "Successful",
//     description:
//       "We’ve received your query. Our team will be in touch shortly.",
//   };
//   opendialog.value = true;
//   contactForm.value = { name: "", email: "", suggestion: "" };
// };
const handleContactSubmit = async () => {
  // Validate before submitting
  if (contactForm.value.name.trim() === "") {
    submission.value = {
      error: true,
      description: "Please write your name!",
      keyword: "Error",
    };
    opendialog.value = true;
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (contactForm.value.email.trim() === "") {
    submission.value = {
      error: true,
      description: "Please write your email!",
      keyword: "Error",
    };
    opendialog.value = true;
    return;
  } else if (!emailRegex.test(contactForm.value.email)) {
    submission.value = {
      error: true,
      description: "Please enter a valid email address.",
      keyword: "Error",
    };
    opendialog.value = true;
    return;
  }

  // Submit to backend
  try {
    const response = await axios.post("http://localhost:8000/api/contactUs", {
      name: contactForm.value.name,
      email: contactForm.value.email,
      message: contactForm.value.suggestion,
    });
    // On success, show modal and clear form
    submission.value = {
      error: false,
      keyword: "Successful",
      description:
        "We’ve received your query. Our team will be in touch shortly.",
    };
    opendialog.value = true;
    contactForm.value = { name: "", email: "", suggestion: "" };
    console.log("Contact Form Submitted:", response.data);
  } catch (error) {
    // On error, show error modal
    submission.value = {
      error: true,
      keyword: "Error",
      description:
        "There was a problem submitting your query. Please try again later.",
    };
    opendialog.value = true;
    console.log(error);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=EB+Garamond:wght@500;700&family=Outfit:wght@100..900&display=swap");

body {
  margin: 0;
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.font-garamond {
  font-family: "EB Garamond", serif;
}

.contact-page-wrapper {
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  box-sizing: border-box;
}

.form-other-container {
  background-image: linear-gradient(to top, #4c0e0e, #000000 75%);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  flex-grow: 1;
  box-sizing: border-box;
  transition: filter 0.3s ease-in-out;
}

.modal-open-background .form-other-container,
.modal-open-background .heading-container {
  filter: blur(5px);
  pointer-events: none;
}

.heading-container {
  font-family: "Outfit", sans-serif;
  text-align: center;
  color: white;
  background-color: #000;
  padding: 1.5rem;
  font-size: 2.5rem;
  font-weight: 500;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  box-sizing: border-box;
}

.heading-container p {
  margin: 0;
}

.partner-contactus-form {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  max-width: 1800px;
  margin: 0 auto;
}

.line-container {
  width: 2px;
  align-self: stretch;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.8),
    rgba(128, 128, 128, 0.3)
  );
  border-radius: 2px;
}

.partner-container {
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  text-align: center;
}

.description-1,
.description-2 {
  font-family: "EB Garamond", serif;
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.main-word {
  color: red;
  font-family: "EB Garamond", serif;
}

.button-container {
  background-color: rgba(137, 17, 17, 1);
  color: white;
  font-weight: 500;
  font-family: "Outfit", sans-serif;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  padding: 0.5rem;
  border-radius: 10px;
  margin-top: 2rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
}
.button-container:hover {
  background-color: #b91c1c;
}

.contact-form-container {
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.contact-input-group {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 400px;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.contact-label {
  font-family: "Outfit", sans-serif;
  font-weight: 500;
  font-size: 25px;
  color: white;
  flex-shrink: 0;
}
.contact-custom-input {
  background-color: rgba(134, 133, 133, 0.7);
  color: white;
  font-family: "Outfit", sans-serif;
  font-size: 16px;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 5px;
  height: 40px;
  width: 100%;
  transition: border-color 0.3s;
}
.contact-custom-input:focus {
  outline: none;
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5);
}
.contact-custom-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}
.contact-textarea-group {
  width: 100%;
  max-width: 402px;
  height: 150px;
}
.contact-custom-textarea {
  width: 100%;
  height: 100%;
  background-color: rgba(134, 133, 133, 0.85);
  color: white;
  font-family: "Outfit", sans-serif;
  font-size: 16px;
  border-radius: 5px;
  padding: 1rem;
  resize: none;
  border: 1px solid transparent;
  box-sizing: border-box;
  transition: border-color 0.3s;
}
.contact-custom-textarea:focus {
  outline: none;
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5);
}
.contact-custom-textarea::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  box-sizing: border-box;
}

.form-card {
  position: relative;
  width: 100%;
  max-width: 56rem;
  background-color: rgba(28, 25, 23, 0.95);
  border: 1px solid #44403c;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(127, 29, 29, 0.25);
}

.form-content {
  max-height: 90vh;
  overflow-y: auto;
  padding: 2.5rem;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #a8a29e;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  z-index: 10;
}
.close-button:hover {
  color: #fff;
}
.close-icon {
  height: 1.5rem;
  width: 1.5rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}
.header-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #ef4444;
  margin-bottom: 0.5rem;
}
.header-description {
  color: #d6d3d1;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.form-container-modal {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-section {
  border: none;
  padding: 0;
  margin: 0;
  border-left: 2px solid #ef4444;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #d6d3d1;
  margin-bottom: 0.25rem;
}

.form-input {
  width: 100%;
  background-color: #292524;
  border: 1px solid #44403c;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  color: #fff;
  transition: box-shadow 0.2s, border-color 0.2s;
  box-sizing: border-box;
}
.form-input:focus {
  outline: none;
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5);
}
.form-textarea {
  resize: vertical;
  min-height: 80px;
}
.input-error {
  border-color: red;
}
.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.submit-container {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
}

.submit-button {
  background-color: #dc2626;
  color: #fff;
  font-weight: 700;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(127, 29, 29, 0.3),
    0 4px 6px -2px rgba(127, 29, 29, 0.15);
  cursor: pointer;
  transform: scale(1);
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.submit-button:hover {
  background-color: #b91c1c;
  transform: scale(1.05);
}

.alert-box-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.alert-box-main-container {
  width: 90%;
  max-width: 500px;
  border: 1.5px solid rgba(255, 255, 255, 1);
  background-color: rgba(30, 5, 5, 0.97);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border-radius: 10px;
  z-index: 2001;
}

.alert-box-description-warning {
  font-family: "EB Garamond", serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.3;
  letter-spacing: 2%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 1);
}

.alert-box-description {
  font-weight: bold;
  font-size: 24px;
}

.alert-box-button {
  max-width: 150px;
  font-family: "Outfit", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 2%;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(137, 17, 17, 1);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.alert-box-button:hover {
  background-color: #a61414;
}

@media (min-width: 2500px) {
  .heading-container {
    font-size: 4rem;
  }
  .description-1,
  .description-2 {
    font-size: 3rem;
  }
  .contact-label {
    font-size: 35px;
  }
}

@media (max-width: 992px) {
  .partner-contactus-form {
    flex-direction: column;
    gap: 3rem;
  }
  .partner-container,
  .contact-form-container {
    width: 90%;
    max-width: 500px;
    padding: 1rem;
  }
  .line-container {
    display: none;
  }
}

@media (max-width: 768px) {
  .heading-container {
    font-size: 1.5rem;
    padding: 1.5rem 1rem;
  }
  .contact-page-wrapper {
    padding-top: 80px;
  }
  .contact-input-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .contact-label {
    font-size: 20px;
  }
  .description-1,
  .description-2 {
    font-size: 1.5rem;
  }
  .form-content {
    padding: 1.5rem;
  }
  .header-title {
    font-size: 1.75rem;
  }
  .section-title {
    font-size: 1.25rem;
  }
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #413030;
}
::-webkit-scrollbar-thumb {
  background: #4f1010;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #dc2626;
}
</style>
