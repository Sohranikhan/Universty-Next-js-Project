import BtnLink from "../../../../Components/BtnLink/BtnLink";
import Headings from "../../../../Components/Headings/Headings";
import { BoxIcon } from "lucide-react";
import { getCategories } from "../../../../utils/getData";  // Function to fetch categories
import { FaBug } from "react-icons/fa";
import DataTable from "./Components/DataTable"; // Ensure DataTable is adapted for categories

const CategoriesPage = async () => {
  // Fetch categories data
  const data = await getCategories();

  // Handling no data scenario
  if (data.success && data?.data?.length <= 0) {
    return (
      <div className="w-full flex flex-col h-full items-center justify-center gap-y-2 sm:p-6 p-3 text-foreground">
        <div className="w-full flex items-center justify-between gap-2">
          <p className="flex items-center gap-3 text-lg font-bold">
            <BoxIcon /> No Categories Found
          </p>
          <BtnLink text={'Create New'} href={'/dashboard/category/new'} />
        </div>
      </div>
    );
  }

  // Handling scenario where categories data is present
  if (data?.success && data?.data?.length > 0) {
    return (
      <div className="w-full h-auto sm:p-6 p-3">
        <div className="flex items-center justify-between">
          <Headings title={'Categories'} des={'All available categories'} />
          <BtnLink text={'Create New'} href={'/dashboard/category/new'} />
        </div>
        <DataTable data={data.data} /> {/* Ensure DataTable can handle categories */}
      </div>
    );
  } else {
    // Handling error scenario
    return (
      <div className="w-full flex flex-col h-full items-center justify-center gap-y-2 sm:m-6 m-3">
        <div className="flex flex-col items-center justify-center gap-2">
          <FaBug />
          <p className="text-2xl text-foreground">{data.message}</p>
        </div>
      </div>
    );
  }
};

export default CategoriesPage;
