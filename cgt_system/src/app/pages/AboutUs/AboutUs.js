import React from 'react';
import './AboutUs.scss';
import partner1 from '../../assets/img/aboutus/partner1.jpg';
import partner2 from '../../assets/img/aboutus/partner2.jpg';
import partner3 from '../../assets/img/aboutus/partner3.jpg';
import partner4 from '../../assets/img/aboutus/partner4.jpg';
import partner5 from '../../assets/img/aboutus/partner5.jpg';
import partner6 from '../../assets/img/aboutus/partner6.jpg';
import partner7 from '../../assets/img/aboutus/partner7.jpg';
import partner8 from '../../assets/img/aboutus/partner8.jpg';
import partner9 from '../../assets/img/aboutus/partner9.jpg';
import partner10 from '../../assets/img/aboutus/partner10.jpg';
import mission from '../../assets/img/aboutus/mission.jpg';
const partners = [
    partner1, partner2, partner3, partner4, partner5,
    partner6, partner7, partner8, partner9, partner10
];

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <section className="intro-section">
                <h1>About Grow+</h1>
                <p> Grow+ helps parents track their child's health and receive expert advice for peace of mind. </p> <p> Get tools to monitor growth, connect with doctors, and receive personalized guidance. </p>
            </section>

            <section className="mission-section">
                <div className="mission-content">
                    <h2>Our Mission</h2>
                    <p>
                        To provide every child with the opportunity for comprehensive physical and mental development.
                    </p>
                    <ul>
                        <li>Provide accurate and reliable information.</li>
                        <li>Connect parents with leading medical experts.</li>
                        <li>Build a supportive and collaborative community.</li>
                    </ul>
                </div>
                <div className="mission-image">
                    <img src={mission} alt="Our Mission" />
                </div>
            </section>


            <section className="values-section">
                <h2>Our Core Values</h2>
                <div className="values-list">
                    {[
                        { title: "Love", desc: "We approach every child and parent with love and care." },
                        { title: "Dedication", desc: "We are dedicated to providing the best possible service." },
                        { title: "Professionalism", desc: "We maintain the highest standards of expertise and ethics." },
                        { title: "Innovation", desc: "We continuously seek new and better ways to serve our community." },
                        { title: "Integrity", desc: "We uphold honesty and transparency in everything we do." },
                        { title: "Collaboration", desc: "We foster teamwork and strong partnerships for better outcomes." }
                    ].map((value, index) => (
                        <div className="value" key={index}>
                            <h3>{value.title}</h3>
                            <p>{value.desc}</p>
                        </div>
                    ))}
                </div>
            </section>






            <section className="testimonials-section">
                <h2>What Parents Say</h2>
                <div className="testimonials">
                    {[
                        { name: "Emily Johnson", feedback: "Grow+ has been a lifesaver for our family! The health tips are invaluable." },
                        { name: "Michael Lee", feedback: "I love how easy it is to track my child’s growth and get expert advice." },
                        { name: "Sophia Martinez", feedback: "A must-have for every parent! It gives me so much peace of mind." },
                        { name: "Daniel Kim", feedback: "I appreciate the accuracy of the information. It has helped me make informed decisions." },
                        { name: "Jessica Brown", feedback: "The community support and expert guidance have been fantastic!" },
                        { name: "William Chen", feedback: "Great platform! I highly recommend it to new parents." },

                    ].map((testimonial, index) => (
                        <div className="testimonial" key={index}>
                            <p>"{testimonial.feedback}"</p>
                            <p>- {testimonial.name}</p>
                        </div>
                    ))}
                </div>
            </section>


            <section className="partners-section">
                <h2 className="partner">Our Partners</h2>
                <div className="partners-wrapper">
                    <div className="partners">
                        {/* Nhân đôi danh sách để hiệu ứng trôi mượt */}
                        {[...partners, ...partners].map((partner, index) => (
                            <img key={index} src={partner} alt={`partner-${index}`} />
                        ))}
                    </div>
                </div>
            </section>


            <section className="contact-section">
                <h2 className="contact">Contact Us</h2>
                <p>Email: info@growplus.com</p>
                <p>Phone: 1-800-GROWPLUS</p>
            </section>
        </div>
    );
};

export default AboutUs;
