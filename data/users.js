import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'violateer',
        email: 'violateer@admin.com',
        password: bcrypt.hashSync('123456', 10)
    }
];

export default users;