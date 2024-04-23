bind = "0.0.0.0:8080"

workers = 64
worker_class = "uvicorn.workers.UvicornWorker"

BASE_DIR = "/app/api"
pythonpath = BASE_DIR + "/src"
chdir = BASE_DIR
