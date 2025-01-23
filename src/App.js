import React from 'react';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';

import LoanForm from './LoanForm';

function App() {
  return (
    <MDBContainer>
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <div className='text-center'>
          <img
            className='mb-4'
            src='https://cdn.pixabay.com/photo/2015/11/03/08/53/calculator-1019743_960_720.jpg'
            style={{ width: 200, height: 200 }}
          />
          <p className='mb-3'>
            Welcome to 
          </p>
          <h1 className='mb-3 text-primary'>Resilient Calculator</h1>

          <h4>Calculate Loan</h4>

          <LoanForm />
        </div>
      </div>
    </MDBContainer>
  );
}

export default App;
