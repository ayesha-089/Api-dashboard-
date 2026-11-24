LAB 8: JSON + jQuery + AJAX/FETCH — API DASHBOARD
==================================================

FOLDER STRUCTURE
api-dashboard/
  index.html
  css/style.css
  js/app.js
  data/sample.json
  README.txt

FEATURES
- Local sample JSON file with 12 student records.
- Fetch API request using fetch(), async/await, response.ok and response.json().
- jQuery AJAX request using $.ajax().
- Dropdown to compare both request methods.
- Dynamic record cards.
- Search by name, email, department or city.
- Department and Active/Inactive filters.
- Pagination (6 records per page).
- Loading, empty and error states.
- Refresh button and last-updated timestamp.
- Total, active and inactive summary.
- Responsive interface and keyboard-visible focus.

RUN THE PROJECT
1. Extract the ZIP file.
2. Open the api-dashboard folder in VS Code.
3. Install the Live Server extension if needed.
4. Right-click index.html and choose "Open with Live Server".
5. The dashboard loads data/sample.json automatically.

IMPORTANT
Do not open index.html directly with a file:// address. Browsers block
many local Fetch requests. Use Live Server or another local HTTP server.

jQuery is loaded from the official CDN in index.html, so internet is
required for the jQuery AJAX option. The JSON sample data is local.
Fetch mode does not depend on the jQuery library.

TEST BOTH REQUESTS
1. Select Fetch API and click Load Data.
2. Press F12 and open Network -> Fetch/XHR.
3. Select sample.json and inspect Headers and Response.
4. Select jQuery AJAX and click Load Data; inspect the request again.
5. Search for a name or city; change the filters.
6. Try a search with no matching result to see the empty state.
7. Use Previous and Next to test pagination.
8. To test error handling, temporarily rename data/sample.json, load
   the data again, then restore the filename.

JSON STRUCTURE
The sample JSON file contains an array of objects. Each object includes:
id, name, email, department, city, and status.

TROUBLESHOOTING
- CORS/local file error: use Live Server, not file://.
- jQuery is undefined: check internet connection and CDN loading.
- JSON parse error: check JSON syntax in data/sample.json.
- Nothing renders: inspect Console and Network; response must be an array.
- 404 error: confirm data/sample.json path and filename.

VALIDATION
HTML: https://validator.w3.org/nu/
JSON: https://jsonlint.com/
