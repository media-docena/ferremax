export const swaggerOptions = {
  swaggerOptions: {
    persistAuthorization: true, // Mantiene el token entre recargas
    authAction: {
      bearerAuth: {
        name: 'bearerAuth',
        schema: {
          type: 'http',
          in: 'header',
          name: 'Authorization',
          description: 'JWT token',
        },
        value: 'Bearer <JWT token here>',
      },
    },
  },
}; 