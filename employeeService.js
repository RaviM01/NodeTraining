const {database} = require('./mongoclient')

exports.list = async (database) => {
    let collection =  await database.collection('employeeDetails');
    let result = await collection.find({}).toArray()
    return new Promise((resolve, reject) => resolve(result));
}

exports.show = async (database, id) => {
    console.log(id, typeof id)
    let collection =  await database.collection('employeeDetails');
    let result = await collection.findOne({"_id": Number(id)});
    return new Promise((resolve, reject) => resolve(result));
}

exports.create = async function createEmployee(employee) {
    let collection =  await database.collection('employeeDetails');
    let result = await collection.insertOne(employee)
    return new Promise((resolve, reject) => resolve(result));
}

exports.update = async function updateEmployee(db, id, employee) {
    const collection = db.collection('employeeDetails');
    return await collection.updateOne({ _id: id }, { $set: employee });
}

exports.delete = async function deleteEmployee(db, id) {
    const collection = db.collection('employeeDetails');
    return await collection.deleteOne({ _id: id });
}