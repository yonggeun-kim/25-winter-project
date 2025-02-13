from fastapi import FastAPI, File, UploadFile
import requests
import shutil
import os

app = FastAPI()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Hugging Face API 설정
HUGGINGFACE_API_KEY = "your_huggingface_api_key"
MODEL_URL = "https://api-inference.huggingface.co/models/openai/whisper-small"

def transcribe_audio(file_path):
    headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}
    with open(file_path, "rb") as f:
        response = requests.post(MODEL_URL, headers=headers, data=f)
    return response.json()

@app.post("/upload-audio/")
async def upload_audio(file: UploadFile = File(...)):
    file_location = f"{UPLOAD_FOLDER}/{file.filename}"
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Hugging Face API를 사용하여 STT 변환
    text_result = transcribe_audio(file_location)

    return {"message": "Audio processed successfully!", "text": text_result.get("text", "Error in processing")}
