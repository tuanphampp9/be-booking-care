
// Define a list of allowed origins
const allowlist = ['http://localhost:3000'];

// Create a custom CORS options delegate
export const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    console.log(allowlist.includes(req.header('Origin')));
    if (allowlist.includes(req.header('Origin'))) {
        corsOptions = { credentials: true, origin: true }; // Reflect the request origin
    } else {
        corsOptions = { origin: false }; // Block other origins
    }
    callback(null, corsOptions);
};
