import prismadb from "@/lib/prismadb";
import React from "react";

interface DashboardPageProps {
  params: { storeId: string }
};
const DashboardPage: React.FC <DashboardPageProps>  = async ({ 
  params 
}) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  });
  return (
    <div>
        <h1 className="text-xl font-bold mb-4 text-gray-900">Let this be the Dashboard</h1>
        <p>Here we will have the dashboard creates</p>
        <p> Active store: <b> {store?.name} </b> </p>
    </div>
  )
}

export default DashboardPage;
