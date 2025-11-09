// __tests__/setup.test.js

describe('Verificación de la configuración de Jest', () => {
  test('debería sumar dos números correctamente', () => {
    // Arrange (Organizar)
    const a = 1;
    const b = 2;

    // Act (Actuar)
    const resultado = a + b;

    // Assert (Afirmar)
    expect(resultado).toBe(3);
  });

  test('debería confirmar que true es true', () => {
    expect(true).toBe(true);
  });
});