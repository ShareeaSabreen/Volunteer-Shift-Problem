//Running the program
First the csvToJSON.js file need to run, which converts the given 
volunteer_attendance_data.csv file into csvToJSON.json 

Then we import the csvToJSON.json to main.js, which runs the main program.The 
program gives the output of every volunteer of who they worked with (node) including
the times they encountered with each other (weight) and writes it back to csv file called
dataResult.csv.



// how you approached to solve this problem
First I converted the given cvs file to json so it would be easier to work with the 
data. Then after importing the json file to the main js file I ran the main() function
which has uniqueMySetDate, uniqueMySetShift, uniqueMySetVolunteerName constants that holds
all the unique dates, shifts and the names of the volunteers.
arrayList() function sorts the array in such a way that shows which volunteers worked 
with each other on a specific day.
Then createObject() makes a object with the names of the volunteers as keys.
objectKey() calculates the number of encunter of each employee. 
finalData() takes the created object and deletes the multiple occured data.
finally I converted the output object into csv file on the last function jsonToCSV().



//what challenges you’ve faced
- Counting the encountered time of the volunteers was very challenging. I finally used the
the help of google and used countOccurrences function from code greeper.
- I aslo had to delete the double occurance of the volunteers name as key and had to delete
it on the finalData().
- I also faced ReferenceError:require is not defined problem. i solved that with the help
of git (ref- https://github.com/nodejs/node/issues/33741?fbclid=IwAR3ZTzkCGCST9ak1kRshIq1zOsG3Mp4svtbmbqmpz4bCQMja0ogELct1fJ8).



//what are the limitations of your solution
- I had the delete the "type": "module" from package.json file manually each time I had the csvToJSON.js file. 

