from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
import uvicorn

class Blog(BaseModel):
    title: str
    body: str
    published: Optional[bool]

app = FastAPI()

@app.get('/')
def blog():
    return {"data": "blog list"}

@app.get('/blog')
def index(published:bool = True, limit=10, sort: Optional[str] = None):
    if published:
        return {'data': f'{limit} published blogs from the Db'}
    return {'data': f'{limit} blogs from the Db'}

@app.get('/blog/{blog_id}')
def showBlog(blog_id: int):
    return {'data': blog_id}

@app.get('/blog/{blog_id}/comments')
def comments(blog_id):
    return {'data' : {"1", "2", "3", "4"}}

@app.post('/blog')
def post(blog:Blog):
    return {'data': f"Blog is created with title - {blog.title}"}
