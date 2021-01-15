import jsonFile from './csvToJSON.json'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');


function main(jsonFile) {
    let dateArray = []
    let shiftArray = []
    let volunteerNameArray = []


    //creating array of total dates,shifts and names
    jsonFile.forEach((element) => {
        dateArray.push(element.date)
        shiftArray.push(element.shift)
        volunteerNameArray.push(element.volunteerName)
    })

    const mySetDate = new Set(dateArray)
    const uniqueMySetDate = [...mySetDate]

    const mySetShift = new Set(shiftArray)
    const uniqueMySetShift = [...mySetShift]

    const mySetVolunteerName = new Set(volunteerNameArray)
    const uniqueMySetVolunteerName = [...mySetVolunteerName]

    let listArray = arrayList(uniqueMySetDate, uniqueMySetShift, jsonFile);
    let object = createObject(uniqueMySetVolunteerName)
    let setObjectKey = objectKey(listArray, object);
    let finalValue = finalData(setObjectKey);
    jsonToCSV(finalValue);
    console.log(finalValue);
}

//takes 3 inputs, 2 arrays and 1 object
//returns sorted array
function arrayList(uniqueMySetDate, uniqueMySetShift, jsonFile) {
    let arrayList = []
    uniqueMySetDate.forEach((date) => {
        uniqueMySetShift.forEach((shift) => {
            let object = []
            jsonFile.forEach((obj, index) => {
                if (date === obj.date && shift === obj.shift) {
                    object.push(obj.volunteerName)
                }
            })
            if (object.length > 0) {
                arrayList.push(object)
            }
        })
    })
    return arrayList
}

//takes an array
//returns an object containing unique names as keys
function createObject(uniqueMySetVolunteerName) {
    let nameObj = {}
    uniqueMySetVolunteerName.forEach((element) => {
        if (nameObj[element]) {
        } else {
            nameObj[element] = {}
        }
    })
    return nameObj
}

//for counting the multiple encounter times
const countOccurrences = arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});

//takes an array and an object
//returns an object
function objectKey(arrayList, nameObj) {
    let keyArray = Object.keys(nameObj);
    keyArray.forEach(elem => {
        arrayList.forEach((element, index) => {
            element.forEach((name, idx) => {
                if (elem == name) {
                    nameObj[elem][index] = element;
                }
            })
        })
    })
    Object.keys(nameObj).forEach(key => {
        let array = []
        Object.keys(nameObj[key]).forEach(newKey => {
            if (array.length > 0) {
                array = [...array, ...nameObj[key][newKey]]
            }
            else {
                array = nameObj[key][newKey];
            }
        })
        let count = countOccurrences(array)
        nameObj[key] = count;
    })
    return nameObj;
}

//takes an object 
//returns an object
function finalData(nameObj) {
    Object.keys(nameObj).forEach(key => {
        Object.keys(nameObj[key]).forEach(newKey => {
            if (key == newKey) {
                delete nameObj[key][newKey]
            }
        })
    })
    return nameObj;
}

//JSON to CSV Converter
//takes an object
//converts it into cvs file
function jsonToCSV(nameObj) {
    let headers = 'Node , All Connected Node with Weigth';
    let csv1 = headers + '\r\n';
    Object.keys(nameObj).forEach(key => {
        csv1 += key + ' , '
        Object.keys(nameObj[key]).forEach((newKey, index) => {
            if (index == (Object.keys(nameObj[key]).length - 1)) {
                csv1 += newKey + " (" + nameObj[key][newKey] + ") "
            }
            else {
                csv1 += newKey + " (" + nameObj[key][newKey] + ") , "
            }
        })
        csv1 += '\r\n'
    })
    
    fs.writeFile('dataResult.csv', csv1, (err) => {
        // In case of a error throw err.
        if (err) throw err;
    })
}

// Run full program
main(jsonFile);