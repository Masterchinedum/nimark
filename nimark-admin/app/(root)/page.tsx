import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


export default function SetupPage() {
  return (
    <div className="p-10">
      <UserButton  afterSignOutUrl="/" />
      <h1>Welcome to Nimark Admin</h1>
      <p>
        Nimark Admin is a dashboard for managing your Nimark account.
      </p>
      <div className="flex-1">
        <Button className="m-10" variant="default">
          Get Started
        </Button>
        <Button>
         Check News
        </Button>
      </div>
    </div>
  );
}
