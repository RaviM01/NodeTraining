const { database } = require('./mongoclient')

exports.list = async (database) => {
    let collection = await database.collection('employeeDetails');
    let result = await collection.find({}).toArray()
    return new Promise((resolve, reject) => resolve(result));
}

exports.show = async (database, id) => {
    console.log(id, typeof id)
    let collection = await database.collection('employeeDetails');
    let result = await collection.findOne({ "_id": Number(id) });
    return new Promise((resolve, reject) => resolve(result));
}

exports.create = async (database, request) => {
    const employee = JSON.parse(JSON.stringify(request.body));
    if (employee) {
        const collection = database.collection('employeeDetails');
        await collection.insertOne(employee);
        return new Promise((resolve, reject) => resolve(employee));
    } else {
        return new Promise((resolve, reject) => reject('invalid employee details'));
    }
}

exports.update = async (database, request) => {
    console.log(`${JSON.stringify(request.body)}`);
    const employeeId = request.params.id;
    console.log(employeeId);
    if (employeeId) {
        const employee = JSON.parse(JSON.stringify(request.body));
        const collection = database.collection('employeeDetails');
        await collection.updateOne({ _id: employeeId }, { $set: employee });
        return new Promise((resolve, reject) => resolve('employee record updated successfully'));
    } else {
        return new Promise((resolve, reject) => reject('employee not found'));
    }
}

exports.delete = async function deleteEmployee(db, id) {
    const collection = db.collection('employeeDetails');
    return await collection.deleteOne({ _id: Number(id) });
}