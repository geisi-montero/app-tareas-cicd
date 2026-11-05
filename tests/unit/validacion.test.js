// Pruebas UNITARIAS: prueban una función aislada, sin servidor ni HTTP.
const { validarTitulo, MAX_TITULO } = require('../../src/validacion');

describe('validarTitulo', () => {
  test('acepta un título válido', () => {
    expect(validarTitulo('Estudiar CI/CD')).toEqual({ ok: true, valor: 'Estudiar CI/CD' });
  });

  test('recorta los espacios al inicio y al final', () => {
    expect(validarTitulo('   hola   ').valor).toBe('hola');
  });

  test.each([undefined, null, 42, {}, []])('rechaza valores que no son texto (%p)', (entrada) => {
    expect(validarTitulo(entrada).ok).toBe(false);
  });

  test('rechaza un título vacío o solo con espacios', () => {
    expect(validarTitulo('').ok).toBe(false);
    expect(validarTitulo('    ').ok).toBe(false);
  });

  test('acepta exactamente el máximo de caracteres', () => {
    expect(validarTitulo('a'.repeat(MAX_TITULO)).ok).toBe(true);
  });

  test('rechaza un título que supera el máximo', () => {
    const r = validarTitulo('a'.repeat(MAX_TITULO + 1));
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/100/);
  });
});
