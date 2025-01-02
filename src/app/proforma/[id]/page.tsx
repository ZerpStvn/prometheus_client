import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import ProformaTable from "../proforma";

const Proforma = ({ params }: { params: { id: string } }) => {
  return (
    <DefaultLayout>
      <ProformaTable projectid={params.id} />
    </DefaultLayout>
  );
};

export default Proforma;
