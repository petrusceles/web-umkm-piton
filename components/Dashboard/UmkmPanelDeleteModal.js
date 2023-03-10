import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingScreen from "../LoadingScreen";

function UmkmPanelDeleteModal({ id, showConfirmationModalState, pageState }) {
  const onClickBackHandler = (e) => {
    e.preventDefault;
    showConfirmationModalState.setShowConfirmationModal(false);
  };

  const onClickDeleteHandler = async (e) => {
    e.preventDefault;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const deleteUmkmResponse = await axios.delete(
        `${process.env.API_URL}/api/companies/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (deleteUmkmResponse.status === 200) {
        toast.success("Successfully delete Umkm data");
      }
      pageState.setPage("List");
    } catch (err) {
      toast.error(String(err));
    }
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [loading]);
  return (
    <>
      {(() => (loading ? <LoadingScreen /> : ""))()}
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-50 overflow-hidden bg-gray-700/10 flex flex-col items-center justify-center">
        <div className="p-4 bg-white rounded-lg">
          <h3 className="font-bold text-lg">
            Apakah anda yakin menghapus data ini?
          </h3>
          <p className="py-4">{id}</p>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={(e) => {
                onClickDeleteHandler(e);
              }}
            >
              Hapus
            </button>
            <button
              className="btn"
              onClick={(e) => {
                onClickBackHandler(e);
              }}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UmkmPanelDeleteModal;
