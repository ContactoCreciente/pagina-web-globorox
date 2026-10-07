/* Recibe los datos del formulario "Club Globorox" y los guarda como una fila en Google Sheets.

   CÓMO INSTALARLO (por si se pierde o se actualiza):
   1. Crea una hoja nueva en https://sheets.new (llámala, por ejemplo, "Clientes Globorox").
   2. En la hoja: menú Extensiones → Apps Script.
   3. Borra lo que aparece y pega TODO este archivo. Guarda (ícono del disquete).
   4. Botón azul "Implementar" → "Nueva implementación" → tipo "Aplicación web".
        - Ejecutar como: Yo
        - Quién tiene acceso: Cualquier persona
      Pulsa "Implementar" y acepta los permisos con tu cuenta de Google.
   5. Copia la URL que termina en /exec y pégala en js/main.js, en SHEET_URL.

   Si luego cambias este código, vuelve a "Implementar" → "Gestionar implementaciones" →
   editar (lápiz) → Versión: "Nueva versión". Así la URL sigue siendo la misma. */

const SHEET_NAME = 'Suscriptores';

function doPost(e) {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Fecha', 'Nombre', 'Correo', 'Próxima fiesta']);
    sheet.setFrozenRows(1);
  }
  const p = e.parameter;
  sheet.appendRow([new Date(), p.name || '', (p.email || '').trim().toLowerCase(), p.occasion || '']);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
