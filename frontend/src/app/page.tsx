"use client"; // 클라이언트 컴포넌트 지정

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("오디오 파일을 선택하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://<EC2_IP>:8000/upload-audio/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("서버 요청 실패");
      }

      const data = await response.json();
      setText(data.text);
    } catch (error) {
      console.error("Error:", error);
      alert("파일 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          🎙️ 오디오 STT 변환
        </h1>

        <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition">
          파일 선택
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {file && <p className="text-gray-600 mt-2 text-sm">📁 {file.name}</p>}

        <button
          onClick={handleUpload}
          className="bg-green-500 text-white py-2 px-4 rounded-lg shadow mt-4 hover:bg-green-600 transition"
        >
          업로드 및 변환
        </button>

        <div className="mt-4 text-gray-700">
          {text ? (
            <p className="border border-gray-300 p-3 rounded-md bg-gray-50">
              {text}
            </p>
          ) : (
            <p className="text-gray-500">변환된 텍스트가 여기에 표시됩니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
