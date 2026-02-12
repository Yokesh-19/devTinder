# DNS Fix - Remove After Restart

After restarting your computer, remove these lines from `src/config/database.js`:

```javascript
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
```

The Windows DNS settings are now permanent, so this workaround won't be needed.

Your final code should be:

```javascript
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://yyokesh2004_db_user:Yokesh192004@namastenode.t9kv2g3.mongodb.net/devTinder?retryWrites=true&w=majority", {
    serverSelectionTimeoutMS: 30000,
    family: 4,
})
.then(() => console.log("Database connection established.."))
.catch((err) => console.error("Database connection failed:", err));
```
