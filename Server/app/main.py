from fastapi import FastAPI

app = FastAPI(title="IftarFinder")

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "project": "IftarFinder"}