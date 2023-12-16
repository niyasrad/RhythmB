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


## Elasticsearch

### Introduction

This document provides instructions on how to set up Elasticsearch on Windows.

### Installation Steps

**Download Elasticsearch**

Download the Elasticsearch zip file from [here](https://www.elastic.co/downloads/elasticsearch).

**Extract the zip file**

Extract the zip file to a location of your choice.

**Run Elasticsearch**

Navigate to the Elasticsearch bin directory and run the `elasticsearch.bat` file.

```bash
cd "C:\Users\Niyas Hameed\Desktop\elasticsearch-7.12.1\bin"
elasticsearch.bat
```

**Verify the installation**

Open a browser and navigate to `http://localhost:9200/`. You should see a json response

```json
{
  "name" : "DESKTOP-1QJQJ8J",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "2bY5QXZrQX2Z3Z2Z3Z2Z3Q",
  "version" : {
    "number" : "7.12.1",
    "build_flavor" : "default",
    "build_type" : "zip",
    "build_hash" : "3186837139b9c6b6d23c3200870651f10d3343b7",
    "build_date" : "2021-04-20T20:56:39.040728659Z",
    "build_snapshot" : false,
    "lucene_version" : "8.8.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

### Conclusion

You have successfully installed Elasticsearch on your system.


## Kibana

### Introduction

This document provides instructions on how to set up Kibana on Windows.

### Prerequisites

Make sure you have Elasticsearch installed on your system. You can download it from [here](https://www.elastic.co/downloads/elasticsearch).

### Installation Steps

**Download Kibana**

Download the Kibana zip file from [here](https://www.elastic.co/downloads/kibana).

**Extract the zip file**

Extract the zip file to a location of your choice.

**Run Kibana**

Navigate to the Kibana bin directory and run the `kibana.bat` file.

```bash
cd "C:\Users\Niyas Hameed\Desktop\kibana-7.12.1-windows-x86_64\bin"
kibana.bat
```

**Verify the installation**

Open a browser and navigate to `http://localhost:5601/`. You should see the Kibana home page.

### Conclusion

You have successfully installed Kibana on your system.

### Note

If you are unable to run Kibana, try changing the `server.port` and `server.host` properties in the `kibana.yml` file. You can find the file in the Kibana config directory.

```bash
C:\Users\Niyas Hameed\Desktop\kibana-7.12.1-windows-x86_64\config
```

Make sure that, if you run Elasticsearch locally, you have changed the `elasticsearch.hosts` property in the `kibana.yml` file to `http://localhost:9200`.

## Backing up Elasticsearch

### Introduction

This document provides instructions on how to back up an Elasticsearch index using kibana.

### Prerequisites

Make sure you have Elasticsearch and Kibana installed on your system. You can download them from [here](https://www.elastic.co/downloads/).

### Backup Steps

**Set up path.repo**

Open the elasticsearch.yml file and add the following lines.

```bash
path.repo: "C:/Users/Niyas Hameed/Desktop/backup"
```


**Create a repository**

Open Kibana and navigate to `Management > Stack Management > Snapshot and Restore > Repositories`.

Click on `Create repository` and enter the details.

**Create a policy**

Click on `Create policy` and enter the details.

**Run the snapshot**

Navigate to `Management > Stack Management > Snapshot and Restore > Snapshots`.

Run the policy, and it will create a snapshot and store it in the repository.
