import React, { useState } from "react";
import { getInitialData, showFormattedDate } from "./utils/index";

const App = () => {
  const initialData = getInitialData();
  const [catatanList, setCatatanList] = useState(initialData);
  const [newCatatan, setNewCatatan] = useState({ title: "", body: "" });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [remainingCharacters, setRemainingCharacters] = useState(50);

  const handleTambahCatatan = () => {
    if (newCatatan.title && newCatatan.body) {
      const timestamp = +new Date();
      const catatan = {
        id: timestamp,
        createdAt: new Date(timestamp).toLocaleString(),
        archived: false,
        ...newCatatan,
      };
      setCatatanList([...catatanList, catatan]);
      setNewCatatan({ title: "", body: "" });
      setRemainingCharacters(50);
    }
  };

  const handleHapusCatatan = (id) => {
    const updatedCatatanList = catatanList.filter(
      (catatan) => catatan.id !== id
    );
    setCatatanList(updatedCatatanList);
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    if (title.length <= 50) {
      setNewCatatan({ ...newCatatan, title });
      setRemainingCharacters(50 - title.length);
    }
  };

  const handleBodyChange = (e) => {
    setNewCatatan({ ...newCatatan, body: e.target.value });
  };

  // Filter catatan berdasarkan pencarian
  const filteredCatatanList = catatanList.filter((catatan) =>
    catatan.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-2xl font-semibold mb-4">Selamat mencatat</h1>
      <div className="mb-4 mx-auto">
        <input
          type="text"
          placeholder="Cari Catatan"
          className="p-2 border rounded-md mr-2 w-1/2"
          value={searchKeyword}
          onChange={handleSearch}
        />
      </div>
      <p className="mt-8 mb-3 font-semibold">Tulis catatan barumu disini</p>
      <div className="mb-4 mx-auto">
        <input
          type="text"
          placeholder="Judul"
          className="p-2 border rounded-md mr-2 ml-8 w-1/2"
          value={newCatatan.title}
          onChange={handleTitleChange}
        />
        <p className="text-gray-500 inline-block">
          {newCatatan.title.length}/{remainingCharacters}
        </p>
      </div>
      <div className="mb-4 mx-auto">
        <textarea
          placeholder="Isi Catatan"
          className="p-2 border rounded-md mr-2 w-1/2 resize-none"
          rows="4"
          value={newCatatan.body}
          onChange={handleBodyChange}
        />
      </div>
      <div className="mb-4 mx-auto">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          onClick={handleTambahCatatan}
        >
          Tambah Catatan
        </button>
      </div>
      {filteredCatatanList.length === 0 ? (
        <p>Tidak ada catatan.</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {filteredCatatanList.map((catatan) => (
            <div
              key={catatan.id}
              className="bg-white rounded-md p-4 m-2 shadow-md mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 relative"
              style={{ minHeight: "400px" }}
            >
              <h2 className="text-xl font-semibold text-left">
                {catatan.title}
              </h2>
              <p className="text-gray-300 text-xs text-left mb-3">
                {showFormattedDate(catatan.createdAt)}
              </p>
              <div className="h-3/4 overflow-y-auto">
                <p className="text-gray-700 text-left">{catatan.body}</p>
              </div>
              <div className="absolute bottom-2 right-2">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleHapusCatatan(catatan.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
