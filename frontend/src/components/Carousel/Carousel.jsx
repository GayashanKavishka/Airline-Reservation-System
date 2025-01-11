import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Carousel } from 'react-bootstrap';
import image from "../../assets/Images/Hero_plane2.png"
import image1 from "../../assets/Images/status.jpg"
import image2 from "../../assets/Images/itinerary.jpg"

const BootstrapCarousel = () => {
    return (
      <div style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "20px" }}>
        <Carousel>
          <Carousel.Item style={{ height: "500px" }}>
            <img
              className="d-block w-100"
              src={image}
              alt="First slide"
              style={{ height: "500px",width:"800px" }}
            />
            <Carousel.Caption>
              <h3>Experience the Most Confotable flight</h3>
              {/* <p>Some representative placeholder content for the first slide.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ height: "500px" }}>
            <img
              className="d-block w-100"
              src={image1}
              alt="Second slide"
              style={{ height: "500px",width:"800px" }}
            />
            <Carousel.Caption>
              <h3>Best Routes For Your Journy</h3>
              {/* <p>Some representative placeholder content for the second slide.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ height: "500px" }}>
            <img
              className="d-block w-100"
              src={image2}
              alt="Third slide"
              style={{ height: "500px",width:"800px" }}
            />
            <Carousel.Caption>
              <h3>Calm Traveling </h3>
              {/* <p>Some representative placeholder content for the third slide.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  };
  

export default BootstrapCarousel;
