module.exports = {
    operateUser: {
        insert: 'insert into user_tabs(user_name,user_age,user_sex) values(?,?,?)',
        queryAll: 'select * from user_tabs',
        getUserById: 'select * from user_tabs where user_id',
        delete: 'delete from user user_id=?',
        update: 'update user_tabs set user_name=?,age=? where id=?',
        login:'select jdUser_name=?,jdUser_pwds=? from jd_users '
    },
    getCity:'select * from city'
}

