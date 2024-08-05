// nimark-admin/lib/paystack.ts
import PayStack from 'paystack-node';

const APIKEY = process.env.PAYSTACK_SECRET_KEY!;
const environment = process.env.NODE_ENV;

const paystack = new PayStack(APIKEY, environment);

export default paystack;