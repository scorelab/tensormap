# Data Pre-Processing Endpoints

## `/addData`

### Task

Adds a file to the store of datasets

### Request Data

`file`: File part of post request (sent via a multipart/form-data form)

### Response

`splitFileInfo[0]` -> The first "token" of the filename delimited by "."

or **if the database call returns one or 0 files**

`"error"`



## `/visualizeData`

### Task

Returns the "store" of the dataset

### Request Data

None (plain `GET` request)

### Response

`responseData` -> A JSON object representing the first result for "store".



## `/addRow`

### Task

Adds a row to a given file in the dataset.

### Request Data

```json
{
    fileName: <FILENAME_TO_ADD_ROW_FOR>,
    columnData: <ARRAY_OF_COLUMNS_FOR_EACH_COLUMN_IN_THE_ROW>,
    rowData: <ARRAY_OF_TITLES>
}
```

> The backend will check to see if the column title (of the current column being iterated over) is specified in `rowData`.

### Response

`"Done"`



## `/editRow`

### Task

Updates the row to a given file in the dataset.

### Request Data

```json
{
    fileName: <FILENAME_TO_EDIT_ROW_FOR>,
    columnData: <ARRAY_OF_COLUMNS_FOR_EACH_COLUMN_IN_THE_ROW>,
    newRowData: <ARRAY_OF_TITLES>
}
```

> The backend will check to see if the column title (of the current column being iterated over) is specified in the new row data,  `newRowData`.

### Response

`"Done"`



## `/deleteRow`

### Task

Deletes the row for a given file from the dataCsv.

### Request Data

```json
{
    fileName: <FILENAME_OF_FILE_WE_WANT_TO_DELETE>,
    columnData: <ARRAY_OF_COLUMNS_FOR_EACH_COLUMN_IN_THE_ROW>,
    oldRowData: <ARRAY {
    	tableData: {
    		id
		}
	}>
}
```

> The backend will check to see if there is a matching id and will drop it.

### Response

`"Done"`



## `/deleteColumn`

### Task

Deletes checked columns for a given file from the dataCsv.

### Request Data

```json
{
    fileName: <FILENAME_OF_FILE_WE_WANT_TO_MODIFY>,
    columnData: <ARRAY_OF_COLUMNS_FOR_EACH_COLUMN_IN_THE_ROW {
    	checked,
    	title
	}>,
    oldRowData: <ARRAY {
    	tableData: {
    		id
		}
	}>
}
```

> The backend will check for all columns that are "checked" and drop them.

### Response

`responseData` -> File from dataset



## `/downloadCSV`

### Task

Downloads the CSV for the user.

### Request Data

```json
{
    fileName: <FILENAME_OF_FILE_WE_WANT_TO_DOWNLOAD>,
}
```

### Response

CSV for File -> Browser gets returned the file with `fullFileName` as its name



## `/saveConfig`

### Task

Edits experiment configurations depending on request.

### Request Data

```json
{
    fileName: <FILENAME_OF_FILE_WE_WANT_TO_CONFIG>,
    features: <ARRAY_OF_FEATURES {
    	checked,
    	title
	}>,
	labels: <ARRAY_OF_LABELS {
    	checked,
        title
    },
	trainPercentage: <PERCENTAGE>
}
```

### Response

`"done"`



## `/viewData`

### Task

Gets all of the dataset files and their information in a JSON format

### Request Data

None

### Response

The entire `dataset` in JSON form
