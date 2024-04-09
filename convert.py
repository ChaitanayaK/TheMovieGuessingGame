import csv

def csv_to_sql(csv_file, sql_file, table_name):
    # Open CSV file for reading
    with open(csv_file, 'r', newline='') as csvfile:
        csv_reader = csv.reader(csvfile)
        header = next(csv_reader)  # Read the header

        # Open SQL file for writing
        with open(sql_file, 'w') as sqlfile:
            # Create table
            sqlfile.write(f"CREATE TABLE {table_name} (\n")
            for column in header:
                sqlfile.write(f"    {column} TEXT,\n")
            sqlfile.write(");\n")

            # Insert data
            for row in csv_reader:
                sqlfile.write(f"INSERT INTO {table_name} VALUES (")
                sqlfile.write(', '.join(f"'{value}'" for value in row))
                sqlfile.write(');\n')

# Example usage
csv_file = 'BollywoodMovieDetail.csv'
sql_file = 'bollywood.sql'
table_name = 'BollywoodMovies'

csv_to_sql(csv_file, sql_file, table_name)
