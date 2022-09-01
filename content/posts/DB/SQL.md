---
title: "[DB] SQL"
date: 2022-09-01T13:28:14+08:00
tags: ["Database"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "Base command of SQL"
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: true
math: true                  # KaTex or not
hidemeta: false
canonicalURL: "https://intervalrain.github.io/"
disableHLJS: true
disableShare: true
disableHLJS: false
hideSummary: false
searchHidden: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowCodeCopyButtons: true
---

# Introduction

## What is SQL?
+ SQL stands for **Structured Query Language**
+ SQL lets you access and manipualate databases
+ SQL becaome a standard of the American National Standards Institute (ANSI) in 1986, and of the International Organization for Standardization (ISO) in 1987

## RDBMS
+ RDBMS stands for **Relational Database Management System**.
+ RDBMS is the basis for SQL, and for all modern database systems such as MS SQL Server, IBM DB2, Oracle, MySQL, and Microsoft Access.
+ The data in RDBMS is stored in database objects called tables. A table is a collection of related data entries and it consists of columns and rows.

# Syntax
```SQL
SELECT * FROM Customers;
```
+ SQL keywords are NOT case sensitive.
+ Some database systems requires a semicolon at the end of each SQL statement.
+ Semicolon is the standard way to separate each SQL statement in database systems that allow more than one SQL statement to be executed in the same call to the server.
## Most Important SQL Commands
+ `SELECT` - extracts data from a database
+ `UPDATE` - updates data in a database
+ `DELETE` - deletes data from a database
+ `INSERT INTO` - inserts new data into a database
+ `CREATE DATABASE` - creates a new database
+ `ALTER DATABASE` - modifies a database
+ `CREATE TABLE` - creates a new table
+ `ALTER TABLE` - modifies a table
+ `DROP TABLE` - deletes a table
+ `CREATE INDEX` - creates an index (search key)
+ `DROP INDEX` - deletes an index

## SELECT
+ The `SELECT` statement is used to select data from a database.  
The data returned is stored in a result table, called the result-set.
```SQL
SELECT column1, column2, ...
FROM table_name;
```

## SELECT DISTINCT
+ The `SELECT DINSTINCT` statement is used to return only distinct (different) values.  
Inside a table, a column often contains many duplicate values; and sometimes you only want to list the different (distinct) values.
```SQL
SELECT DISTINCT column1, column2, ...
FROM table_name;
```

## WHERE
+ The `WHERE` clause is used to filter records.  
It is used to extract only those records that fultill a specified condition.
```SQL
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```
+ Operators can be used in the `WHERE` clause: 
\\(\begin{array}{|c|l|}\hline
\text{Operator}&\text{Description}\\\\\hline
\text{=}&\text{Equal}\\\\\hline
\text{>}&\text{Greater than}\\\\\hline
\text{<}&\text{Less than}\\\\\hline
\text{>=}&\text{Greater than or equal}\\\\\hline
\text{<=}&\text{Less than or equal}\\\\\hline
\text{<>, !=}&\text{Not equal}\\\\\hline
\text{BETWEEN}&\text{Between a certain range}\\\\\hline
\text{LIKE}&\text{Search for a pattern}\\\\\hline
\text{IN}&\text{To specify multiple possible values for a column}\\\\\hline
\end{array}\\)

## AND, OR, NOT
+ THE `WHERE` clause can be combined with `AND`, `OR`, and `NOT` operators.  
The `AND` and `OR` operators are used to filter records based on more than one condition:
    + The `AND` operator displays a record if all the conditons separated by `AND` are TRUE.
    + The `OR` operator displays a record if any of the conditons separated by `OR` is TRUE.
    + THE `NOT` operator display a record if the condition(s) it NOT TRUE.
```SQL
SELECT column1, column2, ...
FROM table_name;
WHERE NOT condition1 AND condition2 OR condition3 ...;
```

## ORDER BY
+ The `ORDER BY` keyword is used to sort the result-set in ascending or descending order.
+ The `ORDER BY` keyword sorts the records in ascending order by default.  
To sort the records in descending order, used `DESC` keyword.
```SQL
SELECT column1, column2, ...
FROM table_name
ORDER BY column1, column2, ... ASC|DESC;
```

## INSERT INTO
+ The `INSERT INTO` statement is used to insert new records in a table.
1. Specify both the column names and the values to be inserted: 
```SQL
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```
2. If you are adding values for all the columns of the table, you do not need to specify the column names in the SQL query. However, make sure the order of the values is in the same order as the columns in the table. Here, the `INSERT INTO` syntax would be as follows:
```SQL
INSERT INTO table_name
VALUES (value1, value2, value3, ...);
```

## IS NULL, IS NOT NULL
+ What is a NULL Value?
    + A field with a NULL value is a field with no value.  
    If a field in a table is optional, it is possible to insert a new record or update a record without adding a value to this field. Then the field will be saved with a NULL value.
    + A NULL value is different from a zero value or a field that contains spaces. A field with a NULL value is one that has been left blank during record creation.

+ How to test for NULL Values?
    + Use the `IS NULL` and `IS NOT NULL` operators.
```SQL
SELECT column_names
FROM table_name
WHERE column_name IS NULL|IS NOT NULL;
```

## UPDATE
+ The `UPDATE` statement is used to modify the existing records in a table.
```SQL
UPDATE table_name
SET columns1 = value1, column2 = value2, ...
WHERE condition;
```

## DELETE
+ The `DELETE` statement is used to delete existing records in a table.
```SQL
DELETE FROM table_name 
WHERE condition;
```

## TOP, LIMIT, FETCH FIRST, ROWNUM
+ The `SELECT TOP` clause is used to specify the number of records to return.
+ The `SELECT TOP` clause is useful on large tables with thousands of records.  
Returning a large number of records can impact performance.

> *Note:* Not all database systems support the `SELECT TOP` clause.  
MySQL supports the `LIMIT` clause to select a limited number of records,  
while Oracle uses `FETCH FIRST n ROWS ONLY` and `ROWNUM`.

+ **SQL Server/Ms Access:**
```SQL
SELECT TOP number|percent column_names(s)
FROM table_name
WHERE condition;
```
+ **MySQL:**
```SQL
SELECT column_names(s)
FROM table_name
WHERE condition
LIMIT number;
```
+ **Oracle 12:**
```SQL
SELECT column_names(s)
FROM table_name
ORDER BY column_name(s)
FETCH FIRST number ROWS only;
```

+ **Older Oracle:**
```SQL
SELECT column_names(s)
FROM table_name
WHERE ROWNUM <= number;
```

+ **Older Oracle(with ORDER BY)**
```SQL
SELECT *
FROM (
    SELECT column_name(s)
    FROM table_name
    ORDER BY column_name(s)
    )
WHERE ROWNUM <= number;
```

## MIN()
+ The `MIN()` function returns the smallest value of the selected column.
```SQL
SELECT MIN(column_name)
FROM table_name
WHERE condition;
```
## MAX()
+ The `MAX()` function returns the largest value of the selected column.
```SQL
SELECT MAX(column_name)
FROM table_name
WHERE condition;
```

## COUNT()
+ The `COUNT()` function returns the number of rows that matches a specified criterion.
```SQL
SELECT COUNT(column_name)
FROM table_name
WHERE condition;
```

## AVG()
+ The `AVG()` function returns the average value of a numeric column.
```SQL
SELECT AVG(column_name)
FROM table_name
WHERE condition;
```
## SUM()
+ The `SUM()` function returns the total sum of a numeric column.
```SQL
SELECT SUM(column_name)
FROM table_name
WHERE condition;
```

## LIKE Operator
+ The `LIKE` operator is used in a `WHERE` clause to search for a specified pattern in a column.
+ There are two wildcards often used in conjunction with `LIKE` operator:
    + The percent sign(%) represents zero, one, or multiple characters
    + The underscore sign(_) represents one, single character
> *Note:* Ms Access uses an asterisk(*) instead of the percent sign(%), and a question mark(?) instead of the underscore(_).

```SQL
SELECT column1, column2
FROM table_name
WHERE columnN LIKE '_a%';
```

## Wildcards
+ A wildcard character is used to substitute one or more characters in a string.  
Wildcard characters are used with `LIKE` operator. The `LIKE` operator is used in a `WHERE` clause to search for a specified pattern in a column.

+ **MS Access:**
|Symbal|Description|Example|
|---|---|---|
|*|Represents zero or more characters|bl* finds bl, black, blue, and blob|
|?|Represents a single character|h?t finds hot, hat, and hit|
|[]|Represents any single character within the brackets|h[oa]t finds hot and hat|
|!|Represents any character not in the brackets|h[!oa]t finds hit|
|-|Represents any single character within the specified range|c[a-b]t finds cat and cbt|
|#|Represents any single numeric character|2#5 finds 205,215,225,235,245,255,265,275,285,295|

+ **SQL Server:**
|Symbal|Description|Example|
|---|---|---|
|%|Represents zero or more characters|bl% finds bl, black, blue, and blob|
|_|Represents a single character|h_t finds hot, hat, and hit|
|[]|Represents any single character within the brackets|h[oa]t finds hot and hat|
|^|Represents any character not in the brackets|h[^oa]t finds hit|
|-|Represents any single character within the specified range|c[a-b]t finds cat and cbt|

## IN
+ The `IN` operator allows you to specify multiple values in a `WHERE` clause.  
The `IN` operator is a short hand for multiple `OR` conditinos.
```SQL
SELECT column_name(s)
FROM table_name
WHERE column_name IN (value1, value2, ...);
```
or
```SQL
SELECT column_name(s)
FROM table_name
WHERE column_name IN (SELECT STATEMENT);
```

## BETWEEN
+ The `BETWEEN` operator selects values within a given range. The values can be numbers, text, or dates.  
The `BETWEEN` operator is **inclusive**: begin and end values are included.
```SQL
SELECT column_name(s)
FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```

## Aliases
+ SQL aliases are used to give a table, or a column in a table, a temporary name.  
Aliases are often used to make column names more readable.  
An alias only exists for the duration of that query.  
An alias is created with the `AS` keyword.

+ Alias Column Syntax
```SQL
SELECT column_name AS alias_name
FROM table_name;
```

+ Alias Table syntax
```SQL
SELECT column_name(s)
FROM table_name AS alias_name;
```

## Joins
+ A `JOIN` clause is used to combine rows from two ormore tables, based on a related column between them.  

**Orderes**
|OrderId|CustomerID|OrderDate|
|---|---|---|
|10308|2|1996-09-18|
|10309|37|1996-09-19|
|10310|77|1996-09-20|

**Customers**
|CustomerID|CustomerName|ContactName|Country|
|---|---|---|---|
|1|Alfreds Futterkiste|Maria Anders|Germany|
|2|Ana Trujillo Emparedados y helados|Ana Trujillo|Mexico|
|3|Antonio Moreno Taqueria|Antonio Moreno|Mexico|

```SQL
SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;
```

**Result**
|OrderID|CustomerName|OrderDate|
|---|---|---|
|10308|Ana Trujillo Emparedados y helados|9/18/1996|
|10365|Antonio Moreno Taquería|11/27/1996|
|10383|Around the Horn|12/16/1996|
|10355|Around the Horn|11/15/1996|
|10278|Berglunds snabbköp|8/12/1996|

![inner join](https://www.w3schools.com/sql/img_innerjoin.gif)
![left join](https://www.w3schools.com/sql/img_leftjoin.gif)
![right join](https://www.w3schools.com/sql/img_rightjoin.gif)
![full outer join](https://www.w3schools.com/sql/img_fulljoin.gif)

## INNER JOIN
+ The `INNER JOIN` keyword selects records that have matching values in both tables.
```SQL
SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;
```

## LEFT JOIN
+ The `LEFT JOIN` keyword returns all records from the left table(table1), and the matching records from the right table(table2). The result is 0 records from the right side, if there is no match.
```SQL
SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name = table2.column_name;
```

## RIGHT JOIN (RIGHT OUTER JOIN)
+ The `RIGHT JOIN` keyword returns all records from the right table(table2), and the matching records from the left table (table1). The result is 0 records from the left side, if there is no match.
```SQL
SELECT column_name(s)
FROM table1
RIGHT JOIN table2
ON table1.column_name = table2.column_name;
```

## FULL JOIN (FULL OUTER JOIN)
+ The `FULL JOIN` keyword returns all records when there is a match in left(table1) or right (table2) table records.
```SQL
SELECT column_name(s)
FROM table1
FULL JOIN table2
ON table1.column_name = table2.column_name
WHERE condition;
```

## Self Join
+ A self join is a regular join, but the table is joined with itself.
```SQL
SELECT column_name(s)
FROM table1 T1, table1 T2
WHERE condition;
```

**Customers**
|CustomerID|CustomerName|ContactName|Address|City|PostalCode|Country|
|---|---|---|---|---|---|---|
|1|Alfreds Futterkiste|Maria Anders|Obere Str. 57|Berlin|12209|Germany|
|2|Ana Trujillo Emparedados y helados|Ana Trujillo|Avda. de la Constitución 2222|México D.F.|05021|Mexico|
|3|Antonio Moreno Taquería|Antonio Moreno|Mataderos 2312|México D.F.|05023|Mexico|

```SQL
SELECT A.CustomerName AS CustomerName1, B.CustomerName AS CustomerName2, A.City
FROM Customers A, Customers B
WHERE A.CustomerID <> B.CustomerID
AND A.City = B.City
ORDER BY A.City;
```

## UNION
+ The `UNION` operator is ued to combine the result-set of two or more `SELECT` statements.
    + Every `SELECT` statement within `UNION` must have the same number of columns
    + The columns must also have similar data types
    + The columns in every `SELECT` statement must also be in the same order.
```SQL
SELECT column_name(s) FROM table1
UNION
SELECT column_name(s) FROM table2
```
+ The `UNION` operator selects only distinct values by default. To allow deuplicate values, use `UNION ALL`:
```SQL
SELECT column_name(s) FROM table1
UNION ALL
SELECT column_name(s) FROM table2
```
> *Note:* The column names in the result-set are usually equal to the column names in the first `SELECT` statement.

## GROUP BY
+ The `GROUP BY` statement groups rows that have the same values into summary rows, like "find the number of customers in each country".
+ The `GROUP BY` statment is often used with aggregate functions (`COUNT()`,`MAX()`,`MIN()`,`SUM()`,`AVG()`) to group the result-set by one ore more columns.
```SQL
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
ORDER BY column_name(s);
```

## HAVING
+ The `HAVING` clause was added to SQL because the `WHERE` keyword cannot be used with aggregate functions.
```SQL
SELECT column_name(s)
FROM table_name
WHERE conditon
GROUP BY column_name(s)
HAVING condition
ORDER BY column_name(s);
```
+ **Sample**
```SQL
SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country
HAVING COUNT(CustomerID) > 5;
```
## EXISTS
+ The `EXISTS` operator is used to test for the existence of any record in a subquery.
+ The `EXISTS` operator returns TRUE if the subquery returns one or more records.
```SQL
SELECT column_name(s)
FROM table_name
WHERE EXISTS
    (SELECT column_name(s) 
    FROM table_name
    WHERE condition
    );
```

## ANY
+ The `ANY` operator:
    + returns a boolean value as a result
    + returns TRUE if ANY of the subquery values meet the condition
+ `ANY` means that the conditon will be true if the operation is true for any of the values in the range.
```SQL
SELECT column_name(s)
FROM table_name
WHERE column_name(s) opeartor ANY
    (SELECT column_name
     FROM table_name
     WHERE condition);
```
## ALL
+ The `ALL` opeartor:
    + returns a boolean value as a result
    + returns TRUE if ALL of the subquery values meet the conditon
    + is used with `SELECT`, `WHERE` and `HAVING` statements
+ `ALL` means that the conditon will be true only if the operation is true for all values in the range.
```SQL
SELECT ALL column_name(s)
FROM table_name
WHERE conditon
```
+ syntax with `WHRER` or `HAVING`
```SQL
SELECT column_name(s)
FROM table_name
WHERE column_name operator ALL
    (SELECT column_name
     FROM table_name
     WHERE condition);

```
## SELECT INTO
+ The `SELECT INTO` statement copies data from one table into a new table.

+ **Copy all columns into a new table:**
```SQL
SELECT *
INTO newtable [IN externaldb]
FROM oldtable
WHERE condition
```
+ **Copy only some columns into a new table:**
```SQL
SELECT column1, column2, column3, ...
INTO new table [IN externaldb]
FROM oldtable
WHERE condition;
```
## INSERT INTO SELECT
+ The `INSERT INTO SELECT` statement copies data from one table and inserts it into another table.
+ The `INSERT INTO SELECT` statement requires that the data types in source and target tables match.
> *Note:* The existing records in the target table are unaffected.

+ **Copy all columns from one table to another table:**
```SQL
INSERT INTO table2
SELECT * FROM table1
WHERE condition
```

+ **Copy only some columns from one table into another table:**
```SQL
INSERT INTO table2 (column1, column2, column3, ...)
SELECT column1, column2, column3, ...
FROM table1
WHERE condition
```
## CASE
+ The `CASE` expression goes through conditions and returns a value when the first condition is met (like an if-then-else statement). So, once a condition is true, it will stop reading and return the result. If no conditions are true, it returns the value in the `ELSE` cluase.
+ If there is no `ELSE` part and no condtions are true, it retures NULL.

```SQL
CASE
    WHEN conditon1 THEN result1
    WHEN conditon2 THEN result2
    WHEN conditonN THEN resultN
    ELSE resuklt
END
```

## NULL Functions

**Products**
|P_Id|ProductName|UnitPrice|UnitsInStock|UnitsOnOrder|
|1|Jarlsberg|10.45|16|15|
|2|Mascarpone|32.56|23| |
|3|Gorgonzola|15.67|9|20|
+ Suppose that the "UnitsOnOrder" column is optional, and may contain NULL values.

+ **MySQL**
1. `INFULL()`
```SQL
SELECT ProductName, UnitPrice * (UnitsInStock + 
IFNULL(UnitsOnOrder, 0))
FROM Products;
```
2. `COALESCE()`
```SQL
SELECT ProductName, UnitPrice * (UnitsInStock + 
COALESCE(UnitsOnOrder, 0))
FROM Products;
```
+ **SQL Server**
1. `ISNULL()`
```SQL
SELECT ProductName, UnitPrice * (UnitsInStock + 
ISNULL(UnitsOnOrder, 0))
FROM Products;
```
2. `COALESCE()`
```SQL
SELECT ProductName, UnitPrice * (UnitsInStock + 
COALESCE(UnitsOnOrder, 0))
FROM Products;
```
+ **MS Access**
1. `IsNULL()`
```SQL
SELECT ProductName, UnitPrice * (UnitsInStock + 
IIF(IsNull(UnitsOnOrder), 0, UnitsOnOrder))
FROM Products;
```
+ **Oracle**
1. `NVL()`
```SQL
SELECT ProductName, UnitPrice * (UnitsInStock + 
NVL(UnitsOnOrder, 0))
FROM Products;
```
2. `COALESCE()`
```SQL
SELECT SELECT ProductName, UnitPrice * (UnitsInStock +
COALESCE(UnitsOnOrder, 0))
FROM Products;
```
## Sotred Precedures
+ A stored procedure is a prepared SQL code that you can save, so the code can be reused over and over again.

+ So if you have an SQL query that you write over and over again, save it as a stored procedure, and then just call it to execute it.

+ You can also pass parameters to a stored procedure, so that the stored procedure can act based on the parameter value(s) that is passed.

**Stored Procedure Syntax**
```SQL
CREATE PROCEDURE procedure_name
AS
sql_statement
GO;
```

** Execute as Stored Procedure
```SQL
EXEC procedure_name;
```
## Comments
+ Single line comments `--`.
+ Multi-line comments `/*` and `*/`.
