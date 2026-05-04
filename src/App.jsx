import React, { useEffect, useState } from "react";

export default function App() {
  const [images, setImages] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const imgs = data.products.map((p) => p.thumbnail);
        setImages(imgs);
      });
  }, []);

  const next = () => {
    if (startIndex + itemsPerPage < images.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const visibleImages = images.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container">
      <h1>Products Gallery</h1>

      <div className="grid">
        {visibleImages.map((img, index) => (
          <div key={index} className="card">
            <img src={img} alt="product" />
          </div>
        ))}
      </div>

      <div className="buttons">
        <button onClick={prev} disabled={startIndex === 0}>
          Previous
        </button>

        <button
          onClick={next}
          disabled={startIndex + itemsPerPage >= images.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
