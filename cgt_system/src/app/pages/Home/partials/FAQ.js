//img
import Images from "../../../assets/img/images.js";

const FAQ = () => {
  return (
    <section id="landingFAQ" className="section-py bg-body landing-faq">
      <div className="container">
        <div className="text-center mb-4">
          <span className="badge bg-label-primary">FAQ</span>
        </div>
        <h4 className="text-center mb-1 ">
          Frequently asked
          <span className="position-relative fw-extrabold z-1 px-2">
            questions
            <img
              src={Images.sectionTitleIcon}
              alt="FAQ Icon"
              className="section-title-img position-absolute object-fit-contain bottom-0 z-n1 "
            />
          </span>
        </h4>
        <p className="text-center mb-12 pb-md-4">
          Browse through these FAQs to find answers about child growth tracking.
        </p>
        <div className="row gy-12 align-items-center">
          <div className="col-lg-5">
            <div className="text-center">
              <img
                src={Images.faq}
                alt="Child Growth FAQ"
                className="faq-image"
              />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="accordion" id="accordionExample">
              <div className="card accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    type="button"
                    className="accordion-button"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordionOne"
                    aria-expanded="true"
                    aria-controls="accordionOne"
                  >
                    How does the child growth tracking system work?
                  </button>
                </h2>
                <div
                  id="accordionOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    The system allows parents to input their child's growth
                    metrics, including height, weight, and developmental
                    milestones. It then provides insights and recommendations
                    based on growth charts and medical guidelines.
                  </div>
                </div>
              </div>
              <div className="card accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    type="button"
                    className="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordionTwo"
                    aria-expanded="false"
                    aria-controls="accordionTwo"
                  >
                    How accurate is the growth tracking data?
                  </button>
                </h2>
                <div
                  id="accordionTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    The system is based on standardized growth charts from
                    health organizations. However, for the most accurate
                    tracking, it is recommended to consult a pediatrician
                    regularly.
                  </div>
                </div>
              </div>
              <div className="card accordion-item active">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    type="button"
                    className="accordion-button"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordionThree"
                    aria-expanded="false"
                    aria-controls="accordionThree"
                  >
                    Can I track vaccinations along with growth milestones?
                  </button>
                </h2>
                <div
                  id="accordionThree"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    Yes, the system includes a vaccination tracker where you can
                    log completed vaccines and upcoming doses to ensure your
                    child follows the recommended immunization schedule.
                  </div>
                </div>
              </div>
              <div className="card accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    type="button"
                    className="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordionFour"
                    aria-expanded="false"
                    aria-controls="accordionFour"
                  >
                    Is my child’s data secure?
                  </button>
                </h2>
                <div
                  id="accordionFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    Yes, we prioritize data security and use encryption to
                    protect your child’s growth and health information from
                    unauthorized access.
                  </div>
                </div>
              </div>
              <div className="card accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    type="button"
                    className="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordionFive"
                    aria-expanded="false"
                    aria-controls="accordionFive"
                  >
                    Can multiple caregivers access the child's records?
                  </button>
                </h2>
                <div
                  id="accordionFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    Yes, parents can share access with caregivers, such as
                    grandparents or babysitters, so they can contribute to and
                    monitor the child's growth data.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
