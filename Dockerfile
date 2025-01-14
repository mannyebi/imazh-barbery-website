FROM python:alpine3.19

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PATH="/PY/BIN:$PATH"

RUN pip install --upgrade pip

COPY ./req.txt /app/req.txt
COPY . /app


RUN pip install -r req.txt


EXPOSE 8080

CMD ["gunicorn", "--bind", "0.0.0.0:8080", "imazh.wsgi:application"]

