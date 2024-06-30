import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="p-10">
      <h1>Welcome to Nimark Admin</h1>
      <p>
        Nimark Admin is a dashboard for managing your Nimark account.
      </p>
      <Button className="mt-10" variant="default">
        Get Started
      </Button>
    </div>
  );
}
