import React from 'react';
import CheckoutWizard from '../components/CheckoutWizard';

export default function payment() {
  return (
    <div>
      <CheckoutWizard activeStep={2} />
      payment info
    </div>
  );
}
