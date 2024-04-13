import React, { useState, useEffect } from "react";
import axios from "axios";
import "./sliderCategories.css";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_URL = "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/aparts";

const Article = ({ data }) => {
  const { name, category, imgurl } = data;

  return (
    <figure className="snip1584 ">
      <img
        src={`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/imgs/${imgurl[0]}`}
        alt={name}
        className="w-full h-48 lg:h-[350px] object-cover"
      />
      <figcaption className="">
        <h3>{name}</h3>
        <h5>{category}</h5>
      </figcaption>
      <a href="#"></a>
    </figure>
  );
};

const News = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1300,
    draggable: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const newsTemplate =
    data.length > 0 ? (
      data.map((item, index) => (
        <div key={index}>
          <Article data={item} />
        </div>
      ))
    ) : (
      <p>Loading...</p>
    );

  return (
    <div className="news">
      <Slider {...settings}>{newsTemplate}</Slider>
      <strong className={"news__count " + (data.length > 0 ? "" : "none")}>
        Усього квартир: {data.length}
      </strong>
    </div>
  );
};

function SliderCategories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data: " + error.message);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="">
      <h2 className="text-3xl font-oswald">Апартаменти</h2>
      {loading ? <p>Loading...</p> : <News data={data.data} />}
    </div>
  );
}

export default SliderCategories;
