import React, { useState } from "react";

//component layout
import Navbar from "../../layouts/NavbarUser.js";
import Footer from "../../layouts/FooterUser.js";

//partial section components
import Hero from "./partials/Hero.js";
import Features from "./partials/Features.js";
import Reviews from "./partials/Reviews.js";
import Teams from "./partials/Teams.js";
import Pricing from "./partials/Pricing.js";
import Funfact from "./partials/Facts.js";
import Contact from "./partials/Contact.js";
import FAQ from "./partials/FAQ.js";
import Cta from "./partials/Cta.js";

//Font
import "../../assets/fonts/iconify-icons.css";

//core css
import "@simonwep/pickr";

import "../../styles/core.css";
import "../../styles/demo.css";
import "./styles/front-page.css";
//vendor CSS
import "../../../../node_modules/perfect-scrollbar/css/perfect-scrollbar.css";

//endbuild
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../../../../node_modules/nouislider/distribute/nouislider.css";

//page CSS
import "./styles/front-page-landing.css";

//core modules

import "bootstrap";
export default function Home() {
  return (
    <div>
      <Navbar />
      <div data-bs-spy="scroll" className="scrollspy-example">
        <Hero />
        <Features />
        <Reviews />
        <Teams />
        <Pricing />
        <Funfact />
        <FAQ />
        <Cta />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
