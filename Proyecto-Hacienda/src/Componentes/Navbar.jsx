import React from "react";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#2196f3",
        color: "white",
      }}
    >
      
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Inicio de sesión"
            style={{ width: "70%", height: "70%" }}
          />
        </div>
    </nav>
  );
};

export default Navbar;
