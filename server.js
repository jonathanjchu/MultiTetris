const express = require('express'),
    app = express(),
    port = 54810;

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

require('./server/utils/socket')(server);
