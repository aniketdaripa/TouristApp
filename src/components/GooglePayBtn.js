import React, { useEffect } from "react";
import GooglePayButton from "@google-pay/button-react";
import { PureComponent } from "react";
import jsPDF from "jspdf";

const GooglePayBtn = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);
  const jsPDFGenerator = () => {
    const date = new Date();
    let doc = new jsPDF("p", "pt");
    doc.text(20, 40, `Paid to: ${props.firstName}' '${props.lastName}`);
    doc.text(20, 60, `Amount paid:$${props.price}`);
    doc.text(20, 80, `Date:${date}`);
    doc.save("Bill Details");
  };
  return (
    <div>
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "123456789874321",
            merchantName: "Demo Merchant",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: "5000",
            currencyCode: "INR",
            countryCode: "IN",
          },
          shippingAddressRequired: true,
          callbackIntents: ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"],
        }}
        onLoadPaymentData={(paymentRequest) => {
          console.log("Success", paymentRequest);
          jsPDFGenerator();
        }}
        onPaymentAuthorized={(paymentData) => {
          console.log("Payment Authorised Success", paymentData);
          return { transactionState: "SUCCESS" };
        }}
        onPaymentDataChanged={(paymentData) => {
          console.log("On Payment Data Changed", paymentData);
          return {};
        }}
        existingPaymentMethodRequired="false"
        buttonColor="black"
        buttonType="Buy"
      />
    </div>
  );
};

export default GooglePayBtn;
