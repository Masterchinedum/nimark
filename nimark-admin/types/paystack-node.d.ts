//nimark-admin/types/paystack-node.d.ts

declare module 'paystack-node' {
    class PayStack {
      constructor(secretKey: string, environment?: string);
  
      initializeTransaction(options: {
        reference: string;
        amount: number;
        email: string;
        callback_url: string;
        metadata: any;
      }): Promise<{
        body: {
          status: boolean;
          message: string;
          data: {
            authorization_url: string;
            access_code: string;
            reference: string;
          };
        };
      }>;
  
      verifyTransaction(options: {
        reference: string;
      }): Promise<{
        body: {
          status: boolean;
          message: string;
          data: any;
        };
      }>;
  
      verifyWebhook(body: string, signature: string): boolean;
  
      // Add other methods as needed
    }
  
    export = PayStack;
  }