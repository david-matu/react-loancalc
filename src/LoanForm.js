import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { MDBInput, MDBBtn, MDBContainer, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

function LoanForm() {
  const [results, setResults] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = 'cmVzaWxpZW50OnB3ZDEyMw==';
      const response = await axios.post('http://localhost:8080/calc/loan-armotization', data, {
        headers: { Authorization: `Basic ${token}` }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error submitting loan request', error);
    }
  };

  return (
    <MDBContainer className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <MDBInput
          label="Loan Amount"
          type="number"
          name="loanAmount"
          {...register('loanAmount', { required: "Loan amount is required", min: 1 })}
          className="mb-3"
          invalid={errors.loanAmount ? true : false}
          placeholder="Enter loan amount"
        />
        {errors.loanAmount && <div className="text-danger">{errors.loanAmount.message}</div>}

        <MDBInput
          label="Loan Period (months)"
          type="number"
          name="loanPeriod"
          {...register('loanPeriod', { required: "Loan period is required", min: 1 })}
          className="mb-3"
          invalid={errors.loanPeriod ? true : false}
          placeholder="Enter loan period in months"
        />
        {errors.loanPeriod && <div className="text-danger">{errors.loanPeriod.message}</div>}

        <MDBInput
          label="Interest Rate (%)"
          type="decimal"
          name="interestRate"
          {...register('interestRate', { required: "Interest rate is required", min: 0 })}
          className="mb-3"
          invalid={errors.interestRate ? true : false}
          placeholder="Enter interest rate"
        />
        {errors.interestRate && <div className="text-danger">{errors.interestRate.message}</div>}

        <MDBBtn type="submit" color="primary" block>
          calculate
        </MDBBtn>
      </form>

      {results && (
        <div class="row">
        <div className="mt-5 col-4">
            <h5 class="text-start text-success fw-b"><i class="fa fa-calendar-alt fa-md" /> Loan Summary</h5>
            <div class="text-start">
                <p><strong>Loan Amount:</strong> {results.loanAmount}</p>
                <p><strong>Interest Rate:</strong> {results.interestRate}%</p>
                <p><strong>Loan Period:</strong> {results.loanPeriod} months</p>
                <p><strong>Monthly Payment:</strong> {results.monthlyPayment}</p>
                <p><strong>Total Interest:</strong> {results.totalInterest}</p>
                <p><strong>Total Repayment:</strong> {results.totalPayment}</p>
            </div>
        </div>

        <div class="mt-5 col-8 shadow">
            <h4>Amortization Table</h4>
            <MDBTable>
                <MDBTableHead>
                <tr>
                    <th>Month</th>
                    <th>Fixed Payment</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Total Interest</th>
                    <th>Ending Balance</th>
                </tr>
                </MDBTableHead>
                <MDBTableBody>
                {results.loanPayments?.map((payment, index) => (
                    <tr key={index}>
                    <td>{payment.paymentMonth}</td>
                    <td>{payment.fixedPayment}</td>
                    <td>{payment.principal}</td>
                    <td>{payment.interest}</td>
                    <td>{payment.totalInterest}</td>
                    <td>{payment.endingBalance}</td>
                    </tr>
                ))}
                </MDBTableBody>
            </MDBTable>
            </div>
        </div>
      )}
    </MDBContainer>
  );
}

export default LoanForm;