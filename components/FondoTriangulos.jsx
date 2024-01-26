import React, { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";

const FondoTriangulos = () => {
  const [triangles, setTriangles] = useState([]);

  const generateTriangles = () => {
    const numberOfTriangles = 100;
    const newTriangles = [];
    for (let i = 0; i < numberOfTriangles; i++) {
      const size = Math.random() * 5 + 2;
      const left = Math.random() * window.innerWidth;
      const delay = Math.random() * 0.5;
      newTriangles.push({ size, left, delay });
    }
    setTriangles(newTriangles); //
  };

  useEffect(() => {
    generateTriangles();
  }, []);

  const animationProps = useSpring({
    from: {
      transform: "trasnslateX(0)",
    },
    to: {
      transform: "trasnslateX(-100%)",
    },
    reset: true,
    reverse: true,
    onRest: () => {
      generateTriangles();
    },
  });

  return (
    <div className='fondo-container'>
      <div className={"triangles"} style={animationProps}>
        {triangles.map((triangle, i) => (
          <div
            className='triangle'
            key={i}
            style={{
              width: triangle.size + "px",
              height: triangle.size + "px",
              left: triangle.left + "px",
              animationDelay: `${triangle.delay}s`,
            }}
          />
        ))}
      </div>
      <div className='escanner'></div>
    </div>
  );
};

export default FondoTriangulos;
