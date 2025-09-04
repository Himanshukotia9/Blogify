from fastapi import FastAPI, Depends, status, HTTPException
from . import schemas, models
from .database import engine, SessionLocal
from sqlalchemy.orm import session

app = FastAPI()

models.Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post('/blog', status_code=status.HTTP_201_CREATED)
def create(request: schemas.Blog, db: session = Depends(get_db)):
    new_blog  = models.Blog(title = request.title, body = request.body)
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog

@app.get('/blog')
def get(db: session = Depends(get_db)):
    blogs = db.query(models.Blog).all()
    return blogs

@app.get('/blog/{id}', status_code=200, response_model=schemas.ShowBlog)
def getSingle(id, db: session = Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if blog:
        return blog
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Blog Not Found with id {id}")
    
@app.delete('/blog/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete(id, db: session = Depends(get_db)):
    try:
        blog = db.query(models.Blog).filter(models.Blog.id == id).first()
        if not blog:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Blog Not Found with id {id}")
        db.delete(blog)
        db.commit()
        return f'Blog with id {id} is deleted'
    except HTTPException as e:
        raise e
    except Exception as e:
        # Catch other errors (DB issues, constraint errors, etc.)
        db.rollback()  # rollback to avoid accidental delete while an error
        raise HTTPException(status_code=500, detail=f"Error deleting item: {str(e)}")

@app.put('/blog/{id}', status_code=status.HTTP_202_ACCEPTED)
def update(id, request: schemas.Blog, db:session = Depends(get_db)):
    try:
        blog_query = db.query(models.Blog).filter(models.Blog.id == id)
        blog = blog_query.first()
        if not blog:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Blog Not Found with id {id}")
        
        payload = request.model_dump()
        blog_query.update(payload, synchronize_session=False)
        db.commit()
        db.refresh(blog)
        return blog
    except HTTPException as e:
        raise e
    except Exception as e:
        # Catch other errors (DB issues, constraint errors, etc.)
        db.rollback()  # rollback to avoid accidental delete while an error
        raise HTTPException(status_code=500, detail=f"Error deleting item: {str(e)}")
        
        