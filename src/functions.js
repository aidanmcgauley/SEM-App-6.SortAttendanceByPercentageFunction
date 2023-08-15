exports.parameterChecker = (items) => {
    for (let item of items) {
        if (!item.item) {
        return { error: true, message: "Item names cannot be empty." };
        }

        // Validate and convert attendance
        if (!Number.isInteger(Number(item.attendance)) || item.attendance != parseInt(item.attendance, 10)) {
        return { error: true, message: "Attendance hours must be integers." };
        }
        item.attendance = parseInt(item.attendance, 10); // Update the item object

        // Validate and convert total hours
        if (!Number.isInteger(Number(item.total_hours)) || item.total_hours != parseInt(item.total_hours, 10)) {
        return { error: true, message: "Total hours must be integers." };
        }
        item.total_hours = parseInt(item.total_hours, 10); // Update the item object

        // Validate non-negative attendance
        if (item.attendance < 0) {
        return { error: true, message: "Attendance hours cannot be negative." };
        }

        // Validate non-negative total hours
        if (item.total_hours < 0) {
        return { error: true, message: "Total hours cannot be negative." };
        }
        
        // Validate attendance against total hours
        if (item.attendance > item.total_hours) {
        return { error: true, message: "Attendance hours cannot exceed total assigned hours." };
        }
    }

    // Return the updated items array
    return { error: null, itemsWithIntegers: items };
};

exports.sortByPercentage = (items) => {
    // Calculate percentage for each item
    items.forEach(item => {
        if(item.total_hours === 0){
            item.percentage = 0; // Set percentage to 0 if total_hours is zero
        } else{
            item.percentage = (item.attendance / item.total_hours) * 100;
        }
        
    });

    // Sort by highest percentage
    items.sort((a, b) => b.percentage - a.percentage);

    return items;
};