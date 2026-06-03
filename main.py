import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai

app = FastAPI(title="Minha API com Gemini")

client = genai.Client(api_key="AIzaSyAAvEFljR6PLoPuY3v-eKS5qrC98auQ9n8")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Libera para o seu site front-end acessar a API
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    pergunta: str

@app.get("/")
def inicio():
    return {"status": "API Online", "modelo": "gemini-2.5-flash"}

@app.post("/perguntar")
def perguntar_ao_gemini(requisicao: PromptRequest):
    try:
        resposta = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=requisicao.pergunta
        )
        return {"resposta": resposta.text}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))