export default function ResumenCard({ titulo, monto, bgColor = "white", textColor = "#478978" }) {
  return (
    <div className={`shadow rounded-lg p-6 w-full sm:w-64`} style={{ backgroundColor: bgColor }}>
      <h3 className="text-sm text-gray-600">{titulo}</h3>
      <p className="text-2xl font-bold mt-2" style={{ color: textColor }}>
        ${monto}
      </p>
    </div>
  );
}