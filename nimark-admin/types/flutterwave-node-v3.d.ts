// nimark-admin/types/flutterwave-node-v3.d.ts

declare module 'flutterwave-node-v3' {
    class Rave {
      constructor(public_key: string, public_secret: string, base_url_or_production_flag?: boolean);
      
      Charge: {
        card(payload: any): Promise<any>;
        // Add other methods as needed
      };
  
      // Add other properties and methods as needed
    }
  
    export = Rave;
  }