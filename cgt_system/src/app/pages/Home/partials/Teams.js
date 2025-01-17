//img
import Images from "../../../assets/img/images.js";

const Teams = () => {
  return (
    <section id="landingTeam" className="section-py landing-team">
      <div className="container">
        <div className="text-center mb-4">
          <span className="badge bg-label-primary">Our Great Team</span>
        </div>
        <h4 className="text-center mb-1">
          <span className="position-relative fw-extrabold z-1 px-2">
            Supported
            <img
              src={Images.sectionTitleIcon}
              alt="laptop charging"
              className="section-title-img position-absolute object-fit-contain bottom-0 z-n1"
            />
          </span>
          by our qualified doctors
        </h4>
        <p className="text-center mb-md-11 pb-0 pb-xl-12">
          We have a team of experienced doctors who are dedicated to providing
          high-quality care to your childs.
        </p>
        <div className="row gy-12 mt-2">
          <div className="col-lg-3 col-sm-6">
            <div className="card mt-3 mt-lg-0 shadow-none">
              <div className="bg-label-primary border border-bottom-0 border-primary-subtle position-relative team-image-box">
                <img
                  src={Images.teamMember1}
                  className="position-absolute card-img-position bottom-0 start-50"
                  alt="human image"
                />
              </div>
              <div className="card-body border border-top-0 border-primary-subtle text-center py-5">
                <h5 className="card-title mb-0">Sophie Gilbert</h5>
                <p className="text-body-secondary mb-0">Project Manager</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card mt-3 mt-lg-0 shadow-none">
              <div className="bg-label-info border border-bottom-0 border-info-subtle position-relative team-image-box">
                <img
                  src={Images.teamMember2}
                  className="position-absolute card-img-position bottom-0 start-50"
                  alt="human image"
                />
              </div>
              <div className="card-body border border-top-0 border-info-subtle text-center py-5">
                <h5 className="card-title mb-0">Paul Miles</h5>
                <p className="text-body-secondary mb-0">UI Designer</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card mt-3 mt-lg-0 shadow-none">
              <div className="bg-label-danger border border-bottom-0 border-danger-subtle position-relative team-image-box">
                <img
                  src={Images.teamMember3}
                  className="position-absolute card-img-position bottom-0 start-50"
                  alt="human image"
                />
              </div>
              <div className="card-body border border-top-0 border-danger-subtle text-center py-5">
                <h5 className="card-title mb-0">Nannie Ford</h5>
                <p className="text-body-secondary mb-0">Development Lead</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card mt-3 mt-lg-0 shadow-none">
              <div className="bg-label-success border border-bottom-0 border-success-subtle position-relative team-image-box">
                <img
                  src={Images.teamMember4}
                  className="position-absolute card-img-position bottom-0 start-50"
                  alt="human image"
                />
              </div>
              <div className="card-body border border-top-0 border-success-subtle text-center py-5">
                <h5 className="card-title mb-0">Chris Watkins</h5>
                <p className="text-body-secondary mb-0">Marketing Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teams;
