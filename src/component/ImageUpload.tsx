import React, { useState } from "react";

const ImageUpload: React.FC = () => {
  const [result, setResult] = useState<[]>([]);

  const handleUpload = () => {
    const imageUpload = document.getElementById(
      "imageUpload"
    ) as HTMLInputElement;
    const file = imageUpload.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        const base64Image = reader.result as string;
        const finalBase64 = base64Image.startsWith("data:image/jpeg;base64")
          ? base64Image.replace("data:image/jpeg;base64,", "")
          : base64Image.replace("data:image/png;base64,", "");

        sendImageToAPI(finalBase64);
      };
    } else {
      setResult([]);
    }
  };

  const sendImageToAPI = (base64Image: string) => {
    const formData = new FormData();
    formData.append("urlimagebase64", base64Image);
    formData.append(
      "API_KEY",
      "bea30ec632162b5b8e8eaf3266c3fa8dd994d9328ebc020f312daab7bf510205"
    );
    formData.append("IMAGEBASE64", "1");
    formData.append("NOTTEXTBOXSDETECTION", "1");
    formData.append("limit", "10");

    fetch("https://www.whatfontis.com/api2/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);

        setResult(data);
      })
      .catch((error) => {
        setResult([]);
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h1>Upload Image</h1>
      <input type="file" id="imageUpload" accept="image/*" />
      <button onClick={handleUpload}>Upload</button>

      <div>
        {/* <table className="table-auto">
          <thead>
            <tr>
              <th>Font Family</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {result?.map((item) => {
              return (
                <tr key={item?.image1}>
                  <td>{item?.title}</td>
                  <td>
                    <img src={item?.image1} alt="Font Image" width={100} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> */}

        {result?.length ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Font Family
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Example
                  </th>
                </tr>
              </thead>
              <tbody>
                {result?.map((item: any) => {
                  return (
                    <tr
                      key={item?.image1}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item?.title}
                      </th>
                      <td className="px-6 py-4">
                        <img src={item?.image1} alt="Font Image" width={200} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <>No results found</>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
