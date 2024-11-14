import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('test.db');

db.withTransactionAsync(async () => {
    await db.runAsync(`
        create table if not exists Account
        (
            TaiKhoan integer primary key not null,
            MatKhau text not null
        )
    `);
    await db.runAsync(`
        insert into Account
        values
            (1, '12345678),
            (2, '12345679')
    `);
});

async function findAll() {
    return await db.getAllAsync(`
        select *
        from Account
    `);
}

async function findById(taiKhoan) {
    return await db.getFirstAsync(`
        select *
        from Account
        where TaiKhoan = ?
    `, taiKhoan);
}

async function create(taiKhoan, matKhau) {
    await db.runAsync(`
        insert into Account
        values (?, ?)
    `, taiKhoan, matKhau);
}

async function edit(taiKhoan, matKhau) {
    await db.runAsync(`
        update Account
        set MatKhau = ?
        where TaiKhoan = ?
    `, matKhau, taiKhoan);
}

async function destroy(taiKhoan) {
    await db.runAsync(`
        delete Account
        where TaiKhoan = ?
    `, taiKhoan);
}

module.exports = { findAll, findById, create, edit, destroy };