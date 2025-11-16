// __tests__/setup.test.js

describe('Verificación de la configuración de Jest', () => {
  test('debería sumar dos números correctamente', () => {
    const a = 1;
    const b = 2;

    const resultado = a + b;

    expect(resultado).toBe(3);
  });

  test('debería confirmar que true es true', () => {
    expect(true).toBe(true);
  });
});