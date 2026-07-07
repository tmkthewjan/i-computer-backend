export default function ProductCard({ name, price, photo }) {
  return (
    <div className="border rounded-lg shadow-lg p-4 w-64">
      <img
        src={photo}
        alt={name}
        className="w-full h-44 object-cover rounded-md"
      />

      <h2 className="text-xl font-bold mt-3">{name}</h2>

      <p className="text-blue-600 font-semibold mt-2">{price}</p>
    </div>
  );
}