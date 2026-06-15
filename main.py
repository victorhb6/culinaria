import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

app = FastAPI(title="CulinarIA - API de Inteligência Artificial")

# Ativa o CORS para permitir que o seu site converse com o servidor Python sem bloqueios
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializa o cliente buscando a chave de forma segura no sistema (evita bloqueio do GitHub)
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

class PromptRequest(BaseModel):
    pergunta: str

@app.get("/")
def inicio():
    return {"status": "API Online", "provedor": "Groq", "modelo": "llama-3.1-8b-instant"}

@app.post("/perguntar")
def perguntar_a_ia(requisicao: PromptRequest):
    try:
        # Chamada real de IA com instruções de comportamento (System Prompt)
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Você é o Assistente do CulinarIA, um chef de cozinha profissional, "
                        "extremamente amigável, prestativo e especialista em gastronomia. "
                        "Responda OBRIGATORIAMENTE em português do Brasil (pt-BR). "
                        "Dê dicas práticas sobre culinária, substituição de ingredientes e modos de preparo."
                    )
                },
                {
                    "role": "user",
                    "content": requisicao.pergunta,
                }
            ],
            model="llama-3.1-8b-instant",
        )
        
        # Extrai o texto da resposta gerada pela IA
        texto_resposta = chat_completion.choices[0].message.content
        return {"resposta": texto_resposta}
        
    except Exception as e:
        # Se acontecer algum erro na API, ele será impresso no terminal do VS Code
        print(f"ERRO CRÍTICO NA IA: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))