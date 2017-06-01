var userSQL={
    insert:'insert into user_tabs(u_name,u_age,u_sex) values (?,?,?)',
    squeryAll:'select * from user_tabs',
    getUserById:'select * from user_tabs where uid=?'
};
module.exports=userSQL;