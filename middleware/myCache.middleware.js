const NodeCache = require('node-cache');
const registrationForm = require("../models/registrationForm");
const myCache = new NodeCache();

const SESSION_DURATION_SECONDS = 60;

// Check if the credentials are in the cache
const myCacheData = async (req, res, next) => {
    const { username, password } = req.body;
    const cacheKey = `${username}-${password}`;

    const cachedSessionData = myCache.get(cacheKey);

    if(cachedSessionData) {
        return res.json({ message: 'Login successful (session cached).' });
    } else {
        // Simulate user authentication logic (replace with your actual authentication logic)
       authenticateUser(username, password).then(data=>{
            if(data){
                // If user is authenticated, store session data in cache for SESSION_DURATION_SECONDS
                myCache.set(cacheKey, { username, isAuthenticated: true }, SESSION_DURATION_SECONDS);
    
                return res.json({ message: 'Login successful.' });
            } else {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }
        });
        
    }

   async function authenticateUser(username, password) {
        const usern = username;
        const pass = password;
        const user = await registrationForm.findOne({ username: usern })
        const isMatch =  await user.comparePassword(pass);
        if (!isMatch) {
            return false;
        } else {
            return true;
        }
    }

}

module.exports = myCacheData;