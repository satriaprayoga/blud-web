<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>KVB</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
    rel="stylesheet" />
        @viteReactRefresh
        @vite('resources/js/app.js')
    </head>
    <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
     
    </body>
</html>