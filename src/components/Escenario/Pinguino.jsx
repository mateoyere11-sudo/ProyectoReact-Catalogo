function Pinguino({ posicion }) {
  return (
    <div
      style={{
        fontSize: "60px",
        lineHeight: 1,
        display: "block",
        position: "relative",
        left: `${posicion}px`,
        transition: "left 0.2s",
      }}
    >
      🐧
    </div>
  );
}

export default Pinguino;