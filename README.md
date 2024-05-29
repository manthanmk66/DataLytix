## Link - https://data-lytix.vercel.app/

# Visualization Dashboard

## Overview

Visualization Dashboard is a web application that fetches data from a MongoDB database and displays it using D3.js. This project demonstrates how to create an interactive dashboard with various filtering options to visualize data dynamically. The application is built using React, Axios for data fetching, and D3.js for data visualization.

## Features

- **Data Fetching**: Retrieve data from a MongoDB database.
- **Dynamic Filtering**: Filter data based on various criteria such as end year, topic, sector, region, PEST, source, SWOT, country, and city.
- **Data Visualization**: Visualize the filtered data using D3.js with an interactive bar chart.
- **Loading Indicator**: Display a loading spinner while data is being fetched.
- **Error Handling**: Show error messages when data fetching fails.

## Technologies Used

- **React**: For building the user interface.
- **Axios**: For making HTTP requests to fetch data.
- **D3.js**: For creating data visualizations.
- **Tailwind CSS**: For styling the application.
- **MongoDB**: For storing and retrieving data.

## Install dependencies
sh
Copy code
npm install
Create a .env file
Create a .env file in the root directory and add your API base URL:

sh
Copy code
REACT_APP_BASE_URL=https://your-api-url.com
Set up MongoDB
Ensure you have MongoDB installed and running. Import your JSON data into a MongoDB collection. You can use the following command:

sh
Copy code
mongoimport --db your-database --collection your-collection --file data.json --jsonArray
Run the application
sh
Copy code
npm start
Open your browser and go to http://localhost:3000.

 ## Usage
Filter Data: Use the input fields to filter the data based on different criteria.
View Visualization: The bar chart will update dynamically based on the applied filters.

## Installation

### Clone the repository
```sh
git clone https://github.com/manthanmk66/DataLytix.git
cd DataLytix
