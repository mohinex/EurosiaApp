export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded';

export interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  customerEmail?: string;
  description?: string;
  callbackUrl: string;
}

export interface PaymentResponse {
  transactionId: string;
  status: PaymentStatus;
  gatewayUrl?: string; // For redirect-based gateways
  rawResponse?: any;
}

export interface PaymentGatewayInterface {
  name: string;
  provider: string;
  createPayment(request: PaymentRequest): Promise<PaymentResponse>;
  verifyPayment(transactionId: string): Promise<boolean>;
  refundPayment(transactionId: string, amount: number): Promise<boolean>;
  handleWebhook(payload: any): Promise<void>;
}

export interface GatewayConfig {
  id: string;
  name: string;
  provider: string;
  isEnabled: boolean;
  isSandbox: boolean;
  apiKey?: string;
  secretKey?: string;
  merchantId?: string;
  callbackUrl?: string;
  currency: string;
  transactionFee: number;
  instructions?: string;
}
