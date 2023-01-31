import React from "react";
import Layout from "../component/layout/Layout";
import First from "../pages/First";

export const Routes = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/first",
        element: <First />,
      },
    ],
  },
];
