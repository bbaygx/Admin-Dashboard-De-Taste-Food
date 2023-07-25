import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
//   console.log(id);
    const MySwal = withReactContent(Swal)


  const [uploadFile, setUploadFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [namaOutlet, setNamaOutlet] = useState("");
  const [jenisMakanan, setJenisMakanan] = useState("");
  const [urlGofood, setUrlGofood] = useState("");
  const [urlGrabfood, setUrlGrabfood] = useState("");
  const [statusToko, setStatusToko] = useState("");
  const [area, setArea] = useState("");
  const [rating, setRating] = useState("");

  const generateImageFromCloudinary = async () => {
    // Upload file ke Cloudinary
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "rjuumnxo"); // Ganti dengan upload preset Anda di Cloudinary
    formData.append("cloud_name", "diupvvswt"); // Ganti dengan nama cloud Anda di Cloudinary

    try {
      const response = await axios
        .post(
          "https://api.cloudinary.com/v1_1/diupvvswt/image/upload",
          formData
        )
        .then((res) => {
          if (res.status === 200) {
            setImageUrl(res.data.url);
            console.log("Image URL: ", res.data.url);
            console.log("Sukses Upload ke Cloudinary");
          }
        });
    } catch (error) {
      console.log('Gagal Upload');
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASEURL}/restaurant/${id}`
        );
        const { data } = res.data;
        console.log(data);
        setImageUrl(data.foodImage);
        setNamaOutlet(data.foodName);
        setJenisMakanan(data.foodType.join(", "));
        setUrlGofood(data.goFoodLink);
        setUrlGrabfood(data.grabFoodLink);
        setStatusToko(data.status);
        setArea(data.region);
        setRating(data.rating);
      } catch (err) {
        console.log('Data Kosong');
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  const sendDataToServer = async (e) => {
    e.preventDefault();

    try {
      const req = await axios.put(
        `${import.meta.env.VITE_BASEURL}/restaurant/${id}`,
        {
          foodName: namaOutlet,
          goFoodLink: urlGofood,
          grabFoodLink: urlGrabfood,
          foodImage: imageUrl,
          foodType: jenisMakanan.split(" , ").map((item) => item.trim()),
          region: area,
          status: statusToko,
          rating: rating,
        }
      );
      console.log(req);
      if (req.status === 201 || req.status === 200 || req.status === 204 ) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        navigate("/table");
      }
    } catch (err) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: err,
            showConfirmButton: false,
            timer: 1500
          })
    }
  };

  return (
    <>
    {console.log(imageUrl)}
      <form
        className="container xl:max-w-md m-auto py-32"
        onSubmit={sendDataToServer}
      >
        <h3 className="py-6 text-2xl font-semibold">Edit Outlet</h3>
        <div className="mb-6">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="user_avatar"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="files"
              type="file"
              onChange={(e) => setUploadFile(e.target.files[0])}
            />
            <div
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="user_avatar_help"
            >
              Kirim dulu gambarnya ke server soalnya kita mau dapat URL
              gambarnya
            </div>
            <span
              className="btn btn-neutral"
              id="files"
              onClick={generateImageFromCloudinary}
            >
              Send
            </span>
          </div>
        </div>
        <div className="imagePreview">
            <img src={`${imageUrl}`} alt="" />
        </div>
        <div className="mb-6">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nama Outlet
          </label>
          <input
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Misal : Kedai Kopi"
            value={namaOutlet}
            onChange={(e) => setNamaOutlet(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Jenis Makanan
          </label>
          <input
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Misal : Minuman, Seafood"
            value={jenisMakanan}
            onChange={(e) => setJenisMakanan(e.target.value)}
          />
        </div>
        <div className="mb-6 flex justify-between gap-2">
          <div className="w-full">
            <label
              htmlFor="small-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Url Outlet Gofood
            </label>
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Misal : https://gofood.co.id/"
              value={urlGofood}
              onChange={(e) => setUrlGofood(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="small-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Url Outlet Grabfood
            </label>
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Misal : https://food.grab.com/id/id/"
              value={urlGrabfood}
              onChange={(e) => setUrlGrabfood(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-6">
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select your country
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option>Pilih Area Jabodetabek</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bogor">Bogor</option>
              <option value="Depok">Depok</option>
              <option value="Tangerang">Tangerang</option>
              <option value="Bekasi">Bekasi</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Rating
          </label>
          <input
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Misal : 4.5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Pilih Status Toko
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={statusToko}
              onChange={(e) => setStatusToko(e.target.value)}
            >
              <option>Pilih status</option>
              <option value="Open">Open</option>
              <option value="Close">Close</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          {imageUrl == "" ? (
            <button type="submit" className="btn btn-gray" disabled>
              Loading
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Edit;
