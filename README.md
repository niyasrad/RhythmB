## Welcome to the RhythmB Docs

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


## PostgreSQL Database Backup Documentation

### Introduction
This document provides instructions on how to back up a PostgreSQL database using the `pg_dump` command.

### Prerequisites
Make sure you have the PostgreSQL `bin` directory in your system's PATH or provide the full path to the `pg_dump` executable.

### Backup Steps

**Navigate to PostgreSQL `bin` directory**

Open a Command Prompt and navigate to the PostgreSQL `bin` directory. Replace `16` with your PostgreSQL version.

```bash
cd "C:\Program Files\PostgreSQL\16\bin"
```

**Run the pg_dump command**

Replace `postgres`, `rhythmb`, and the output file path accordingly.

```bash
pg_dump -U postgres -d rhythmb > "C:\Users\Niyas Hameed\Desktop\rhythmb.sql"
```
Enter your PostgreSQL password when prompted.

**Verify the backup**

Open the output file in a text editor and verify that it contains the database schema and data.

### Restore Steps

**Navigate to PostgreSQL `bin` directory**

Open a Command Prompt and navigate to the PostgreSQL `bin` directory. Replace `16` with your PostgreSQL version.

```bash
cd "C:\Program Files\PostgreSQL\16\bin"
```

**Run the psql command**

Replace `postgres`, `rhythmb`, and the input file path accordingly.

```bash
psql -U postgres -d rhythmb < "C:\Users\Niyas Hameed\Desktop\rhythmb.sql"
```

Enter your PostgreSQL password when prompted.

### Conclusion
You have successfully backed up your PostgreSQL database using `pg_dump`. Store the backup file in a secure location.
