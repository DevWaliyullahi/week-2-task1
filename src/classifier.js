function classifier(input) {
    // Check if the input array is empty
    if (input.length === 0) {
        
      return { noOfGroups: 0 };
    }
  
    // Create a copy of the input array to avoid modifying the original array
    const inputCopy = input.slice();
  
    // Function to calculate the age of a student based on their date of birth
    function calculateAge(dob) {
      const currentDate = new Date("2019"); // Assuming the current year is 2019
      const birthDate = new Date(dob);
      const ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
      return ageInYears;
    }
  
    // Sort the copied input array by age, with the youngest students first
    inputCopy.sort((a, b) => calculateAge(a.dob) - calculateAge(b.dob));
  
    // Initialize an object to store the grouped students, a counter, and constants
    const groups = {};
    let groupCounter = 1;
    const maxGroupSize = 3;
    const maxAgeDifference = 5;
  
    // Iterate through the students in the sorted input array
    for (const student of inputCopy) {
      const age = calculateAge(student.dob);
      let assigned = false;
  
      // Check each existing group to see if the student can be added
      for (let i = 1; i <= groupCounter; i++) {
        const groupKey = `group${i}`;
        const group = groups[groupKey];
  
        if (!group) {
          // If the group doesn't exist, create it and add the student
          groups[groupKey] = {
            members: [
              {
                name: student.name,
                dob: student.dob,
                regNo: student.regNo,
                age,
              },
            ],
            oldest: age,
            sum: age,
            regNos: [parseInt(student.regNo)],
          };
          assigned = true;
          break;
        }
  
        if (
          group.members.length < maxGroupSize &&
          Math.abs(group.oldest - age) <= maxAgeDifference
        ) {
          // If the group can accept the student, add them and update group information
          group.members.push({
            name: student.name,
            dob: student.dob,
            regNo: student.regNo,
            age,
          });
          group.members.sort((a, b) => a.age - b.age);
          group.oldest = group.members[group.members.length - 1].age;
          group.sum += age;
          group.regNos.push(parseInt(student.regNo));
          group.regNos.sort((a, b) => a - b); // Sort regNos in ascending order
          assigned = true;
          break;
        }
      }
  
      if (!assigned) {
        // If the student couldn't be added to any existing group, create a new group
        groupCounter++;
        groups[`group${groupCounter}`] = {
          members: [
            {
              name: student.name,
              dob: student.dob,
              regNo: student.regNo,
              age,
            },
          ],
          oldest: age,
          sum: age,
          regNos: [parseInt(student.regNo)],
        };
      }
    }
  
    // Calculate the number of groups
    const noOfGroups = groupCounter;
  
    // Create the output object with the number of groups and group details
    const output = { noOfGroups };
    for (const groupKey in groups) {
      output[groupKey] = groups[groupKey];
    }
  
    // Return the output object
    return output;
  }
  
  // Export the classifier function as the default export of the module
  export default classifier;
  