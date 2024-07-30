import { DarkSearch } from "@/components/DarkSearch";
import { SubNavBar } from "@/components/SubNavBar";
import React, { Suspense } from "react";

const SearchPage = () => {
  return (
    <div>
      <SubNavBar>
        <Suspense>
          <DarkSearch />
        </Suspense>
      </SubNavBar>
    </div>
  );
};

export default SearchPage;
