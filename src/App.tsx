import React from "react";

import { BrowserRouter as Router, useRoutes, Link } from "react-router-dom";
// import { selectUsers, setUsers } from "./store/users.slice";
import { CatImage, Navbar } from "./components";

import { useGetCategoriesQuery } from "./features/api/apiSlice";
import "./app.scss";

const App = () => {
  const {
    data: categories,
    isLoading,
    isSuccess,
  } = useGetCategoriesQuery(null);

  const categoriesRoutes =
    isSuccess && categories
      ? [
          {
            path: "/",
            element: <CatImage category={{ id: 0, name: "No Category" }} />,
          },
          ...categories.map((category: ICategory) => ({
            path: category.name,
            element: <CatImage category={category} />,
          })),
        ]
      : [];

  let routes = useRoutes(categoriesRoutes);

  return (
    <div>
      {isLoading ? (
        <div>lodaing</div>
      ) : (
        <>
          <Navbar items={categories} />

          {routes}
        </>
      )}
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
