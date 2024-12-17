import { OrderStatus } from "@prisma/client";
import { readFileSync } from "fs";
import { join } from "path";
import { IAuthUser } from "../../types";
import prisma from "../../utils/prisma";
import { initiatePayment, verifyPayment } from "./payment.utils";

const setUpPayment = async (user: IAuthUser, orderId: string) => {
  const customerInfo = await prisma.customer.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const orderInfo = await prisma.order.findUniqueOrThrow({
    where: {
      id: orderId,
      customerId: customerInfo.id,
    },
  });

  const amount =
    orderInfo.totalAmount - (orderInfo.totalAmount * orderInfo.discount) / 100;

  const trxId = `trx_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

  const paymentData = {
    tran_id: trxId,
    order_id: orderId,
    amount: amount.toFixed(2),
    cus_name: customerInfo.name,
    cus_email: customerInfo.email,
  };

  const paymentSession = await initiatePayment(paymentData);

  return { payment_url: paymentSession.payment_url };
};

const purchaseConfirmation = async (
  trxId: string,
  orderId: string,
  status: string
) => {
  const verifyResponse = await verifyPayment(trxId);

  let orderInfo;

  const filePath = join(__dirname, "../../../../public/confirmation.html");
  let template = readFileSync(filePath, "utf-8");

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    orderInfo = await prisma.order.findUniqueOrThrow({
      where: {
        id: orderId,
      },
      include: {
        customer: true,
      },
    });

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: OrderStatus.COMPLETED,
        trxId,
      },
    });

    template = template
      .replace("{{message}}", `Payment ${status}`)
      .replace(
        "{{message2}}",
        `Thank you <i>${orderInfo.customer.name}</i>, for ordering.`
      );
  } else {
    template = template.replace("{{message}}", `Payment ${status}`);
    template = template.replace("{{message2}}", `Please try again later`);
  }

  return template;
};

export const PaymentServices = {
  setUpPayment,
  purchaseConfirmation,
};
