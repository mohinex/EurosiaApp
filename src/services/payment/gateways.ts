import { PaymentGatewayInterface, PaymentRequest, PaymentResponse, GatewayConfig } from "./types";

export class StripeGateway implements PaymentGatewayInterface {
  name = "Stripe";
  provider = "stripe";
  private config: GatewayConfig;

  constructor(config: GatewayConfig) {
    this.config = config;
  }

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    console.log(`Stripe: Initiating payment for ${request.amount} ${request.currency}`);
    // Real implementation would call Stripe API
    return {
      transactionId: `st_${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      gatewayUrl: 'https://checkout.stripe.com/pay/...'
    };
  }

  async verifyPayment(transactionId: string): Promise<boolean> {
    return true;
  }

  async refundPayment(transactionId: string, amount: number): Promise<boolean> {
    return true;
  }

  async handleWebhook(payload: any): Promise<void> {
    console.log("Stripe Webhook received", payload);
  }
}

export class BkashGateway implements PaymentGatewayInterface {
  name = "bKash";
  provider = "bkash";
  private config: GatewayConfig;

  constructor(config: GatewayConfig) {
    this.config = config;
  }

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    console.log(`bKash: Initiating payment for ${request.amount} BDT`);
    return {
      transactionId: `bk_${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      gatewayUrl: 'https://payment.bkash.com/...'
    };
  }

  async verifyPayment(transactionId: string): Promise<boolean> {
    return true;
  }

  async refundPayment(transactionId: string, amount: number): Promise<boolean> {
    return true;
  }

  async handleWebhook(payload: any): Promise<void> {
     console.log("bKash Webhook received", payload);
  }
}

export class ManualPaymentGateway implements PaymentGatewayInterface {
  name = "Manual Bank Transfer";
  provider = "manual";
  private config: GatewayConfig;

  constructor(config: GatewayConfig) {
    this.config = config;
  }

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    return {
      transactionId: `man_${Date.now()}`,
      status: 'pending',
      rawResponse: { instructions: this.config.instructions }
    };
  }

  async verifyPayment(transactionId: string): Promise<boolean> {
    return false; // Manual verification required
  }

  async refundPayment(transactionId: string, amount: number): Promise<boolean> {
    return true;
  }

  async handleWebhook(payload: any): Promise<void> {}
}
