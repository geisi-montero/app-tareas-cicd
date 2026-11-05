// Lógica pura de validación (sin Express): fácil de probar con pruebas unitarias.
const MAX_TITULO = 100;

/**
 * Valida y normaliza el título de una tarea.
 * @param {unknown} titulo
 * @returns {{ ok: boolean, valor?: string, error?: string }}
 */
function validarTitulo(titulo) {
  if (typeof titulo !== 'string') return { ok: false, error: 'El título es obligatorio' };
  const valor = titulo.trim();
  if (!valor) return { ok: false, error: 'El título es obligatorio' };
  if (valor.length > MAX_TITULO) {
    return { ok: false, error: `El título no puede superar ${MAX_TITULO} caracteres` };
  }
  return { ok: true, valor };
}

module.exports = { validarTitulo, MAX_TITULO };
