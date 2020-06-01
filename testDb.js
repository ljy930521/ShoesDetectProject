const dm = require('./db-module.js');

// dm.getUserCount((count) => {
//     console.log(count[0].count);
// });
// dm.getItemInfo(1, user => {
//     console.log(user[0]);
// }); 
// dm.getUserInfo('kim', user => {
//     console.log(user[0]);
// dm.getUsers(1, user => {
//     console.log(user[0]);
// });
let params = [3];
dm.insertStep(params, () => {
    dm.getCurrentStep(row => {
        console.log(row);
    });
});
// let params = ['4', '1234', '김영업'];
// dm.registerItem(params, () => {
//     dm.getAllItems(1, rows => {
//         console.log(rows);
//     });
// });
// dm.getAllDepts(depts => {
//     let options = '';
//     for (let deptItem of depts) {
//         options += `<option value="${deptItem.did}">${deptItem.name}</option>`;
//     }
//     console.log(options);
// });

// let params = ['1234213123', '강1321231영업', '12312312312.jpg'];
// dm.updateItem(params, () => {
//     dm.getAllItems(1, rows => {
//         console.log(rows);
//     });
// });

// /* dm.getBeforeUserCount('sales', count => {
//     console.log(count[0].count);
// }) */
// dm.getTankSenseData(1, rows => {
//     console.log(rows);
// });