import React from "react";

interface Params {
  params: {
    id: string;
  };
}
function result({ params }: Params) {
  const { id } = params;
  return <div>{id}</div>;
}

export default result;
