import React from "react";
import { Carousel } from "react-bootstrap";

interface Props {}

const MainPage: React.FC<Props> = () => {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Wheel Deal</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership
          management!
        </p>
      </div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.motortrend.com/uploads/sites/11/2020/06/Beautiful-Chevrolet-showfloor-1967.jpg?fit=around%7C875:492"
            alt="Vintage Car Dealership"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://manofmany.com/wp-content/uploads/2021/06/20-most-beautiful-cars-in-the-world-according-to-science--1200x800.jpeg"
            alt="Mercedes with butterfly doors"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.shopify.com/s/files/1/0562/3001/9234/files/image1_63b8836f-5003-4590-a279-bc0362dabf0f.png?v=1658176253"
            alt="Ford Bronco"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default MainPage;
