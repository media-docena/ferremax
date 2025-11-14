import React from 'react'
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { useLoaderData } from 'react-router';

function Documentacion() {
  const spec = useLoaderData();

  return (
    <div className='mx-auto text-center'>
      <SwaggerUI spec={spec} />
    </div>
  );
}

export default Documentacion