import { getUserData } from "../util.js";

export function addSession(ctx, next) {
    
     ctx.user = getUserData();      // returns null or Object with user data - email, _id and accessToken
    
    next();
}