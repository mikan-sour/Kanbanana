export const CHECK_EXISTING_USERNAME = (username:string):string => {
    return `SELECT * FROM users WHERE username = "${username}"`
}