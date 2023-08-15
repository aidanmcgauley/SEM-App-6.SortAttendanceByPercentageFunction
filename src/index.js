const functions = require('@google-cloud/functions-framework');
const { parameterChecker, sortByPercentage } = require('./functions');

exports.sortbypercentage = (req, res) => {
    
    // Set CORS headers
    res.set('Access-Control-Allow-Origin', '*');

    // More headers if needed
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    
    let items = [
        {
            item: req.query.item_1,
            attendance: req.query.attendance_1,
            total_hours: req.query.total_hours_1
        },
        {
            item: req.query.item_2,
            attendance: req.query.attendance_2,
            total_hours: req.query.total_hours_2
        },
        {
            item: req.query.item_3,
            attendance: req.query.attendance_3,
            total_hours: req.query.total_hours_3
        },
        {
            item: req.query.item_4,
            attendance: req.query.attendance_4,
            total_hours: req.query.total_hours_4
        }
    ];

    // Call parameterChecker to validate and convert the parameters
    const parameterResult = parameterChecker(items);

    // If there's an error, send it to the client and return early
    if (parameterResult.error) {
        res.json(parameterResult);
        return;
    }

    // If there's no error, call sortByPercentage with the converted items
    const sortedItems = sortByPercentage(parameterResult.itemsWithIntegers);

    // Send the sorted items back to the client
    res.json({ sorted_by_percentage: sortedItems });
    
};