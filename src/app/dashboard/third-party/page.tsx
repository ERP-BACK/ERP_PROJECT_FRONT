import React from "react";
import { getAllThirdPartyPagination } from "@/action";

async function ThirdPartypage() {
  const thirdpartyPagination = await getAllThirdPartyPagination({
    limit: 5,
    afterCursor: null,
    beforeCursor: null,
  });
  console.log(thirdpartyPagination);
  return <div>page</div>;
}

export default ThirdPartypage;
