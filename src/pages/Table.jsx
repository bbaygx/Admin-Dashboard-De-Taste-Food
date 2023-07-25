import React, { useEffect, useState } from "react";
import { Sidebar } from "../components";
import { FiRefreshCcw, CiMenuKebab, AiOutlinePlus } from "../utils";
import GrabFoodImg from "../assets/grabfood.png";
import GoFoodImg from "../assets/gofood.png";
import { Link } from "react-router-dom";
import { getData } from "../api";
import Swal from 'sweetalert2';
import axios from "axios";


const Table = () => {


  const [saveData, setSaveData] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        setSaveData(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err.response && err.response.status === 404) {
          console.log('Data Kosong');
        } else {
          console.error('Terjadi kesalahan:', err.message);
        }
      }
    };

    fetchData();
  }, []);

  // console.log(saveData);


  const handleDelete = (id) => {
    // Tampilkan SweetAlert untuk konfirmasi
    Swal.fire({
      title: 'Apakah Anda yakin ingin menghapus outlet ini?',
      text: 'Tindakan ini tidak dapat dibatalkan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Jika pengguna mengklik tombol 'Ya, hapus', panggil fungsi deleteOutlet
        deleteOutlet(id);
      }
    });
  };


  const deleteOutlet = (id) => {
  // Lakukan permintaan HTTP DELETE menggunakan Axios
  axios
    .delete(`${import.meta.env.VITE_BASEURL}/restaurant/${id}`)
    .then((response) => {
      // Jika berhasil, Anda bisa melakukan sesuatu, misalnya memberi tahu pengguna bahwa outlet telah dihapus
      Swal.fire('Berhasil!', 'Outlet telah dihapus.', 'success');
    })
    .catch((error) => {
      // Jika ada kesalahan, tampilkan pesan kesalahan
      Swal.fire('Error!', 'Terjadi kesalahan saat menghapus outlet.', 'error');
      console.error('Terjadi kesalahan saat menghapus outlet:', error);
    });
  };
  


  


  return (
    <>
      {/* <Sidebar> */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[90%] m-auto my-32">
          <div className="flex items-center justify-between pb-10 bg-white dark:bg-gray-900">
            <div>
              <Link to={`/table/add`}>
                <button className="btn btn-primary flex gap-3">
                  <AiOutlinePlus className="text-white text-xl" />
                  <span>Add</span>
                </button>
              </Link>
              {/* Dropdown menu */}
              <div
                id="dropdownAction"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownActionButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Reward
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Promote
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Activate account
                    </a>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Delete User
                  </a>
                </div>
              </div>
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Outlet
                </th>
                <th scope="col" className="px-6 py-3">
                  Jenis Makanan
                </th>
                <th scope="col" className="px-6 py-3">
                  Platform
                </th>
                <th scope="col" className="px-6 py-3">
                  Region
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Terlaris
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {/* HERE */}
            <tbody>
              {saveData && saveData.map((outlet, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={outlet._id}
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={outlet.foodImage}
                      alt=""
                    />
                    <div className="pl-3">
                      <div className="text-base font-medium">
                        {outlet.foodName}
                      </div>
                      {/* <div className="font-normal text-gray-500">neil.sims@flowbite.com</div> */}
                    </div>
                  </th>
                  <td className="px-6 py-4">{outlet.foodType.join(", ")}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-3">
                      <div>
                        <div
                          id="tooltip-gofood"
                          role="tooltip"
                          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        >
                          Go Food
                          <div className="tooltip-arrow" data-popper-arrow />
                        </div>
                        <Link to={outlet.goFoodLink}>
                          <img
                            data-tooltip-target="tooltip-gofood"
                            className="w-6 h-6 rounded cursor-pointer"
                            src={outlet.goFoodLink ? GoFoodImg : GrabFoodImg}
                            alt="Medium avatar"
                          />
                        </Link>
                      </div>
                      <div>
                        <div
                          id="tooltip-grabfood"
                          role="tooltip"
                          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        >
                          Grab Food
                          <div className="tooltip-arrow" data-popper-arrow />
                        </div>
                        <Link to={outlet.grabFoodLink}>
                          <img
                            data-tooltip-target="tooltip-grabfood"
                            className="w-6 h-6 rounded"
                            src={outlet.grabFoodLink ? GrabFoodImg : GoFoodImg}
                            alt="Medium avatar"
                          />
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">{outlet.region}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-300 mr-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                        {outlet.rating}
                      </p>
                      {/* <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
                          <a href="#" className="text-sm font-medium text-gray-900 dark:text-white">Rating</a> */}
                    </div>
                  </td>
                  {/* <td className="px-4 py-4 text-center">{outlet.terlaris < 5000 ? 'Kurang Laris' : 'Terlaris'}</td> */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${outlet.status == "Open" ? `bg-green-500` : `bg-red-500`
                          } mr-2`}
                      ></span>
                      <span>{outlet.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="dropdown dropdown-top dropdown-end">
                      <label tabIndex={0} className="m-1">
                        <CiMenuKebab className="text-xl" />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <Link
                            to={`/table/edit/${outlet._id}`}
                            className="text-blue-500"
                          >
                            Edit
                          </Link>
                        </li>
                        <li>
                          {" "}
                          <Link onClick={() => handleDelete(outlet._id)}>
                            Delete
                          </Link>{" "}
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      {/* </Sidebar> */}

      {/* {newIsLoading ? <div className="alert">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>12 unread messages. Tap to see.</span>
</div> : null} */}
    </>
  );
};

export default Table;
