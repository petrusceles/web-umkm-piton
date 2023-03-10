import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CategoriesPanelCard from "./CategoriesPanelCard";
import LoadingScreen from "../LoadingScreen";

function CategoriesPanelMain({
  pageState,
  categoriesState,
  editCategoriesState,
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        setLoading(true);
        const categoriesRequest = await axios.get(
          `${process.env.API_URL}/api/categories`
        );
        setLoading(false);
        const categoriesResponse = categoriesRequest.data;
        if (categoriesResponse.status) {
          const categoriesData = categoriesResponse.data;
          categoriesState.setCategories(categoriesData.categories);
        }
        // console.log(categoriesResponse);
      } catch (err) {
        toast.error(err);
      }
    };

    fetchCategoriesData();
  }, [pageState.page]);

  useEffect(() => {}, [categoriesState.categories]);

  return (
    // {(() => (loading ? <LoadingScreen /> : ""))()}
    <>
      {(() => (loading ? <LoadingScreen /> : ""))()}
      <div className="flex flex-wrap gap-8 w-full h-fit">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold text-xl">List Kategori</h1>
          <button
            className="btn capitalize px-8 text-base bg-slate-700 rounded-full hover:bg-slate-800"
            onClick={() => {
              pageState.setPage("Tambah");
            }}
          >
            Tambah Kategori
          </button>
        </div>
        <div className="grid grid-cols-4 w-full gap-4">
          {categoriesState.categories.map((e, i) => {
            return (
              <CategoriesPanelCard
                name={e.name}
                pageState={pageState}
                editCategoriesState={editCategoriesState}
                key={e.id}
                id={e.id}
              />
            );
          })}
          {/* {(() => {
          let categories = categoriesState.categories.map((e, i) => {
            return (
              <CategoriesPanelCard
                name={e.name}
                pageState={pageState}
                editCategoriesState={editCategoriesState}
                key={e.id}
                id={e.id}
              />
            );
          });

          for (let i = 0; i < 5; i++) {
            categories.push(...categories);
          }
          return categories;
        })()} */}
        </div>
      </div>
    </>
  );
}

export default CategoriesPanelMain;
