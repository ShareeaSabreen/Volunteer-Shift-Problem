//converting the csv to json

const csvFilePath='./volunteer_attendance_data.csv'
const csv=require('csvtojson')
const fs = require('fs')

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
	console.log(jsonObj);

//writing back json in output file

	fs.writeFileSync("csvToJSON.json",JSON.stringify(jsonObj),"utf-8",(err) =>{
		if (err)console.log(err)
	})
	



})