//img
import Images from "../../../assets/img/images";

const Features = () => {
  return (
    // <!-- Useful features: Start -->
    <section id="landingFeatures" class="section-py landing-features">
      <div class="container">
        <div class="text-center mb-4">
          <span class="badge bg-label-primary">Useful Features</span>
        </div>
        <h4 class="text-center mb-1">
          <span class="position-relative fw-extrabold z-1">
            Everything you need
            <img
              src={Images.sectionTitleIcon}
              alt="laptop charging"
              class="section-title-img position-absolute object-fit-contain bottom-0 z-n1"
            />
          </span>
          to track your child's development
        </h4>
        <p class="text-center mb-12">
          More than just a toolset, our system provides comprehensive insights
          and easy-to-use tracking for your child's growth journey.
        </p>
        <div class="features-icon-wrapper row gx-0 gy-6 g-sm-12">
          <div class="col-lg-4 col-sm-6 text-center features-icon-box">
            <div class="mb-4 text-primary text-center">
              <svg
                width="64"
                height="65"
                viewBox="0 0 64 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.2"
                  d="M32 5C40.8366 5 48 12.1634 48 21C48 33 32 47 32 47C32 47 16 33 16 21C16 12.1634 23.1634 5 32 5Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M32 5C40.8366 5 48 12.1634 48 21C48 33 32 47 32 47C32 47 16 33 16 21C16 12.1634 23.1634 5 32 5Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <circle cx="32" cy="21" r="6" fill="currentColor" />
              </svg>
            </div>
            <h5 class="mb-2">Healthy Growth Tracking</h5>
            <p class="features-icon-description">
              Monitor your child's growth milestones with accurate and
              insightful tracking tools.
            </p>
          </div>
          <div class="col-lg-4 col-sm-6 text-center features-icon-box">
            <div class="d-flex justify-content-center align-items-center mb-4 text-primary">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 2C15.43 2 2 15.43 2 32s13.43 30 30 30 30-13.43 30-30S48.57 2 32 2zm0 56C17.64 58 6 46.36 6 32S17.64 6 32 6s26 11.64 26 26-11.64 26-26 26z"
                  fill="currentColor"
                ></path>
                <path
                  d="M44 20h-8V12h-8v8h-8v8h8v8h8v-8h8v-8z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h5 class="mb-2">Vaccination & Immunization</h5>
            <p class="features-icon-description">
              Keep track of your child's vaccination schedule with complete
              age-based updates.
            </p>
          </div>

          <div class="col-lg-4 col-sm-6 text-center features-icon-box">
            <div class="text-center mb-4 text-primary">
              <svg
                width="64"
                height="65"
                viewBox="0 0 64 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="32"
                  cy="24"
                  r="10"
                  stroke="currentColor"
                  stroke-width="2"
                ></circle>
                <path
                  d="M16 52C16 44.268 22.268 38 30 38H34C41.732 38 48 44.268 48 52"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
              </svg>
            </div>
            <h5 class="mb-2">Growth Tracking</h5>
            <p class="features-icon-description">
              Easily monitor your child's growth milestones and development
              stages.
            </p>
          </div>

          <div class="col-lg-4 col-sm-6 text-center features-icon-box">
            <div class="text-center mb-4 text-primary">
              <svg
                width="64"
                height="65"
                viewBox="0 0 64 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.2"
                  d="M32 6.5C18.7452 6.5 8 17.2452 8 30.5C8 43.7548 18.7452 54.5 32 54.5C45.2548 54.5 56 43.7548 56 30.5C56 17.2452 45.2548 6.5 32 6.5Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M22 30.5H32M32 30.5H42M32 30.5V20.5M32 30.5V40.5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <h5 class="mb-2">Personalized Insights</h5>
            <p class="features-icon-description">
              Get tailored recommendations based on your child's unique growth
              patterns.
            </p>
          </div>

          <div class="col-lg-4 col-sm-6 text-center features-icon-box">
            <div class="text-center mb-4 text-primary">
              <svg
                width="64"
                height="65"
                viewBox="0 0 64 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.2"
                  d="M31.9999 8.46631C27.1437 8.46489 22.4012 9.93672 18.399 12.6874C14.3969 15.438 11.3233 19.3381 9.58436 23.8723C7.84542 28.4066 7.52291 33.3617 8.65945 38.0831C9.79598 42.8045 12.3381 47.0701 15.9499 50.3163C17.4549 47.3526 19.7511 44.8636 22.5841 43.125C25.417 41.3864 28.676 40.4662 31.9999 40.4663C30.0221 40.4663 28.0887 39.8798 26.4442 38.781C24.7997 37.6822 23.518 36.1204 22.7611 34.2931C22.0043 32.4659 21.8062 30.4552 22.1921 28.5154C22.5779 26.5756 23.5303 24.7938 24.9289 23.3952C26.3274 21.9967 28.1092 21.0443 30.049 20.6585C31.9888 20.2726 33.9995 20.4706 35.8268 21.2275C37.654 21.9844 39.2158 23.2661 40.3146 24.9106C41.4135 26.5551 41.9999 28.4885 41.9999 30.4663C41.9999 33.1185 40.9464 35.662 39.071 37.5374C37.1956 39.4127 34.6521 40.4663 31.9999 40.4663C35.3238 40.4662 38.5829 41.3864 41.4158 43.125C44.2487 44.8636 46.545 47.3526 48.0499 50.3163C51.6618 47.0701 54.2039 42.8045 55.3404 38.0831C56.477 33.3617 56.1545 28.4066 54.4155 23.8723C52.6766 19.3381 49.603 15.438 45.6008 12.6874C41.5987 9.93672 36.8562 8.46489 31.9999 8.46631Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M32 40.4663C37.5228 40.4663 42 35.9892 42 30.4663C42 24.9435 37.5228 20.4663 32 20.4663C26.4772 20.4663 22 24.9435 22 30.4663C22 35.9892 26.4772 40.4663 32 40.4663ZM32 40.4663C28.6759 40.4663 25.4168 41.3852 22.5839 43.1241C19.7509 44.863 17.4548 47.3524 15.95 50.3163M32 40.4663C35.3241 40.4663 38.5832 41.3852 41.4161 43.1241C44.2491 44.863 46.5452 47.3524 48.05 50.3163M56 32.4663C56 45.7211 45.2548 56.4663 32 56.4663C18.7452 56.4663 8 45.7211 8 32.4663C8 19.2115 18.7452 8.46631 32 8.46631C45.2548 8.46631 56 19.2115 56 32.4663Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <h5 class="mb-2">Excellent Support</h5>
            <p class="features-icon-description">
              A team of expert doctors is always available to help you.
            </p>
          </div>
          <div class="col-lg-4 col-sm-6 text-center features-icon-box">
            <div class="text-center mb-4 text-primary">
              <svg
                width="64"
                height="65"
                viewBox="0 0 64 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.2"
                  d="M32 5.5C18.1929 5.5 7 16.6929 7 30.5C7 44.3071 18.1929 55.5 32 55.5C45.8071 55.5 57 44.3071 57 30.5C57 16.6929 45.8071 5.5 32 5.5Z"
                  fill="currentColor"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M32 7.5C18.7452 7.5 8 18.2452 8 30.5C8 42.7548 18.7452 53.5 32 53.5C45.2548 53.5 56 42.7548 56 30.5C56 18.2452 45.2548 7.5 32 7.5ZM30 22.5C30 21.3954 30.8954 20.5 32 20.5C33.1046 20.5 34 21.3954 34 22.5V30.5H42C43.1046 30.5 44 31.3954 44 32.5C44 33.6046 43.1046 34.5 42 34.5H32C30.8954 34.5 30 33.6046 30 32.5V22.5Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h5 class="mb-2">Growth Tracking</h5>
            <p class="features-icon-description">
              Easily monitor your child's development with intuitive charts and
              reports.
            </p>
          </div>
        </div>
      </div>
    </section>
    // <!-- Useful features: End -->
  );
};

export default Features;
