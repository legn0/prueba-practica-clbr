function Producto({ name, max_price, min_price, availability }) {
  const price_range = () => {
    if (max_price != min_price) {
      return (
        <p>
          Rango de precios: ${min_price} a ${max_price}
        </p>
      );
    } else {
      return <p>Precio: ${max_price}</p>;
    }
  };

  return (
    <div>
      <h3>{name}</h3>
      {price_range()}
      <p>Disponibilidad: {availability} mercados</p>
    </div>
  );
}

export default Producto;
