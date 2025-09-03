
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function CreateAdminAccount() {
    try {
        const existingAdmin = await User.findOne({ email: 'admin@test.com' });
        if (existingAdmin) {
            console.log('Admin account already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({
            name: 'Admin',
            email: 'admin@test.com',
            password: hashedPassword,
            role: 'admin'
        });

        const savedAdmin = await admin.save();
        console.log('Admin account created successfully:', savedAdmin);

    } catch (error) {
        console.log('Error creating admin:', error.message);
    }
}

module.exports = CreateAdminAccount;
