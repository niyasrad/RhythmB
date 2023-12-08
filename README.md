## Welcome to the RhythmB Docs

You can find the references to how this project has been built from the following links:
1. [Folder Structure](https://stackoverflow.com/questions/64943693/what-are-the-best-practices-for-structuring-a-fastapi-project)


## Setup

To set the project up locally, we'll be using venvs.

**Create a virtual environment**

```bash
pip install virtualenv
virtualenv venv
```

**Activate the virtual environment**

```bash
.\venv\Scripts\activate
```

**Install the dependencies**

```bash
pip install -r requirements.txt
```

**Run the project**

```bash
uvicorn app:app --reload --port 8080
```
