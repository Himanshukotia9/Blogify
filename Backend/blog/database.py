# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SUPABASE_DATABASE_URL = 'postgresql://postgres:IVT9YmdzrXE41ghA@db.lqhmjscbjdcaqgwjlieg.supabase.co:5432/postgres?sslmode=require'

engine = create_engine(
    SUPABASE_DATABASE_URL,
    connect_args={"sslmode": "require"}
    )

SessionLocal = sessionmaker(bind = engine, autocommit=False, autoflush=False)

Base = declarative_base()

