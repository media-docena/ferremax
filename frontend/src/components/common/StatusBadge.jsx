// components/common/StatusBadge.jsx

function StatusBadge ({ status }) {
  const statusConfig = {
    Activo: 'text-green-800 bg-green-200',
    Inactivo: 'text-red-800 bg-red-200',
    Agotado: 'text-red-800 bg-red-200',
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${
        statusConfig[status] || 'text-gray-800 bg-gray-200'
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;