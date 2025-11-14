// Helper to build a pdfmake document definition for a Venta invoice
// Usage: buildFacturaDocDefinition(venta, { logoSvg })

export function buildFacturaDocDefinition(venta, { logoSvg } = {}) {
  const fechaHora = `${formatFechaSafe(venta.fecha)}, ${formatHoraSafe(venta.hora)}`;

  const rows = [
    [
      { text: 'Producto', style: 'thLeft' },
      { text: 'Cantidad', style: 'thCenter' },
      { text: 'Precio Unitario', style: 'thCenter' },
      { text: 'Subtotal', style: 'thCenter' },
    ],
    ...((venta.detalleventa || []).map((d) => [
      { text: d?.producto?.nombre ?? '-', style: 'tdLeft' },
      { text: String(d?.cantidad ?? 0), style: 'tdCenter' },
      { text: toARS(d?.precio ?? 0), style: 'tdCenter' },
      { text: toARS(d?.subtotal ?? 0), style: 'tdCenter' },
    ])),
  ];

  const subtotal = Array.isArray(venta.detalleventa)
    ? venta.detalleventa.reduce((acc, it) => acc + Number(it?.subtotal || 0), 0)
    : 0;

  const dd = {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40],
    footer: function (currentPage, pageCount) {
      return {
        margin: [40, 8, 40, 0],
        fontSize: 8,
        color: '#999',
        columns: [
          { text: `Factura #${venta.idVenta ?? ''}`, alignment: 'left' },
          { text: `Página ${currentPage} de ${pageCount}`, alignment: 'right' },
        ],
      };
    },
    content: [
      {
        // Header tipo flex: título a la izquierda y logo+marca a la derecha
        columns: [
          {
            width: '*',
            text: 'Comprobante',
            style: 'title',
            margin: [0, 2, 0, 0],
          },
          {
            width: 'auto',
            columns: [
              logoSvg ? { svg: logoSvg, width: 50, height: 50, margin: [0, 0, 8, 0] } : null,
              { text: 'FerreMax', style: 'brand', margin: [8, 12, 0, 0] },
            ].filter(Boolean),
          },
        ],
        columnGap: 8,
        margin: [0, 0, 0, 20],
      },
      { text: 'Información de la Venta', style: 'section' },
      {
        // Contenedor ancho completo con dos columnas de igual tamaño
        table: {
          widths: ['*', '*'],
          body: [[
            {
              border: [false, false, false, false],
              stack: [
                { text: 'Numero de Factura', style: 'label' },
                { text: `# ${venta.idVenta ?? '-'}`, style: 'value', margin: [0, 2, 0, 0] },
                { text: 'Forma de Pago', style: 'label', margin: [0, 12, 0, 0] },
                { text: venta?.formapago?.descripcion ?? 'N/A', style: 'value', margin: [0, 2, 0, 0] },
              ],
            },
            {
              border: [false, false, false, false],
              stack: [
                { text: 'Fecha', style: 'label' },
                { text: fechaHora, style: 'value', margin: [0, 2, 0, 0] },
                { text: 'Empleado', style: 'label', margin: [0, 12, 0, 0] },
                { text: `# ${venta?.empleado?.idEmpleado ?? '-'}`, style: 'value', margin: [0, 2, 0, 0] },
              ],
            },
          ]],
        },
        layout: 'noBorders',
        margin: [0, 8, 0, 20],
      },
      { text: 'Detalle de los Articulos', style: 'section' },
      {
        table: {
          headerRows: 1,
          // Ocupa todo el ancho del contenido para que los márgenes izq/der sean iguales
          widths: ['*', 80, 100, 100],
          body: rows,
        },
        layout: {
          fillColor: function (rowIndex) { return rowIndex === 0 ? '#f9fafb' : null; },
          hLineWidth: function (i, node) { return i === 1 ? 1 : 0; },
          vLineWidth: function () { return 0; },
          hLineColor: function () { return '#e5e7eb'; },
          paddingLeft: function (i, node) { return 0; },
          paddingRight: function (i, node) { return 0; },
          paddingTop: function (i) { return i === 0 ? 8 : 6; },
          paddingBottom: function (i) { return i === 0 ? 8 : 6; },
        },
        margin: [0, 8, 0, 20],
      },
      {
        columns: [
          {
            width: 180,
            stack: [
              {
                columns: [
                  { text: 'Subtotal', style: 'totalLabel' },
                  { text: toARS(subtotal), style: 'totalValue', alignment: 'left' },
                ],
                columnGap: 10,
                margin: [0, 0, 0, 8],
              },
              {
                columns: [
                  { text: 'Total', style: 'totalLabelBold' },
                  { text: toARS(venta?.totalVenta ?? subtotal), style: 'totalValueBold', alignment: 'left' },
                ],
                columnGap: 10,
              },
            ],
          },
          { text: '', width: '*' },
        ],
        margin: [0, 0, 0, 0],
      },
    ],
    styles: {
      title: { fontSize: 20, bold: true, color: '#1f2937' },
      brand: { fontSize: 18, bold: true, color: '#1f2937' },
      section: { fontSize: 14, bold: true, margin: [0, 0, 0, 0], color: '#1f2937' },
      label: { fontSize: 10, color: '#6b7280', bold: true },
      value: { fontSize: 11, color: '#1f2937' },
      thLeft: { bold: true, alignment: 'left', fontSize: 11, color: '#374151' },
      thCenter: { bold: true, alignment: 'center', fontSize: 11, color: '#374151' },
      thRight: { bold: true, alignment: 'right', fontSize: 11, color: '#374151' },
      tdLeft: { alignment: 'left', fontSize: 10, color: '#1f2937' },
      tdCenter: { alignment: 'center', fontSize: 10, color: '#1f2937' },
      tdRight: { alignment: 'right', fontSize: 10, color: '#1f2937' },
      totalLabel: { fontSize: 12, bold: true, color: '#1f2937' },
      totalValue: { fontSize: 12, color: '#1f2937' },
      totalLabelBold: { fontSize: 13, bold: true, color: '#000000' },
      totalValueBold: { fontSize: 13, bold: true, color: '#000000' },
    },
    defaultStyle: { fontSize: 11, color: '#1f2937' },
  };

  return dd;
}

function toARS(n) {
  const num = Number(n || 0);
  return `$ ${num.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function formatFechaSafe(v) {
  try { return new Date(v).toLocaleDateString('es-AR'); } catch { return '-'; }
}
function formatHoraSafe(v) {
  if (!v) return '-';
  try {
    // Si v ya es una cadena de hora como "14:30:00" o "21:14:00"
    const timeString = String(v);
    
    // Si contiene "T" es un datetime completo
    if (timeString.includes('T')) {
      const date = new Date(timeString);
      return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    
    // Si es solo la hora "HH:MM:SS" o "HH:MM"
    const parts = timeString.split(':');
    if (parts.length >= 2) {
      const hours = parts[0].padStart(2, '0');
      const minutes = parts[1].padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    
    return '-';
  } catch { 
    return '-'; 
  }
}
