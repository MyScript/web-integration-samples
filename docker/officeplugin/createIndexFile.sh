#!/bin/sh

set -e

echo "<html>
<head>
    <title>List of all MyScript plugins</title>
</head>
<body>
    <h2>MyScript Math Office Plugin <a href=\"/Home.html\">[view]</a></h2>
</body>

</html>" > /usr/share/nginx/html/index.html

nginx -g "daemon off;"
