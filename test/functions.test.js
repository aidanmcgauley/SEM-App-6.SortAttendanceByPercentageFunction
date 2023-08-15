const { parameterChecker, sortByPercentage } = require('../src/functions');

describe('parameterChecker', () => {
    it('should return error if any item name is empty', () => {
        const items = [{ item: '', attendance: '5', total_hours: '10' }];
        const result = parameterChecker(items);
        expect(result).toEqual({ error: true, message: "Item names cannot be empty." });
    });

    it('should return error if attendance is not an integer', () => {
        const items = [{ item: 'Item 1', attendance: '5.5', total_hours: '10' }];
        const result = parameterChecker(items);
        expect(result).toEqual({ error: true, message: "Attendance hours must be integers." });
    });

    it('should return error if total hours is not an integer', () => {
        const items = [{ item: 'Item 1', attendance: '5', total_hours: '10.5' }];
        const result = parameterChecker(items);
        expect(result).toEqual({ error: true, message: "Total hours must be integers." });
    });

    it('should return error if attendance exceeds total assigned hours', () => {
        const items = [{ item: 'Item 1', attendance: '11', total_hours: '10' }];
        const result = parameterChecker(items);
        expect(result).toEqual({ error: true, message: "Attendance hours cannot exceed total assigned hours." });
    });

    it('should return error if attendance is negative', () => {
        const items = [{ item: 'Item 1', attendance: '-5', total_hours: '10' }];
        const result = parameterChecker(items);
        expect(result).toEqual({ error: true, message: "Attendance hours cannot be negative." });
    });

    it('should return error if total hours is negative', () => {
        const items = [{ item: 'Item 1', attendance: '5', total_hours: '-10' }];
        const result = parameterChecker(items);
        expect(result).toEqual({ error: true, message: "Total hours cannot be negative." });
    });

    it('should return items with attendance and total_hours converted to integers if all checks pass', () => {
        const items = [
        { item: 'Item 1', attendance: '5', total_hours: '10' },
        { item: 'Item 2', attendance: '3', total_hours: '8' },
        ];
        const result = parameterChecker(items);
        expect(result).toEqual({
        error: null,
        itemsWithIntegers: [
            { item: 'Item 1', attendance: 5, total_hours: 10 },
            { item: 'Item 2', attendance: 3, total_hours: 8 },
        ],
        });
    });
});


describe('sortByPercentage', () => {
    it('should sort items by percentage in descending order', () => {
        const items = [
        { attendance: 10, total_hours: 100 },
        { attendance: 30, total_hours: 100 },
        { attendance: 20, total_hours: 100 }
        ];
        const sortedItems = sortByPercentage(items);
        expect(sortedItems[0].attendance).toEqual(30);
        expect(sortedItems[1].attendance).toEqual(20);
        expect(sortedItems[2].attendance).toEqual(10);
    });

    it('should handle division by zero', () => {
        const items = [
        { attendance: 10, total_hours: 0 },
        { attendance: 20, total_hours: 50 }
        ];
        const sortedItems = sortByPercentage(items);
        expect(sortedItems[0].percentage).toEqual(40);
        expect(sortedItems[1].percentage).toEqual(0);
    });

    it('should return an empty array when passed an empty array', () => {
        const items = [];
        const sortedItems = sortByPercentage(items);
        expect(sortedItems).toEqual([]);
    });

    it('should handle non-numeric values', () => {
        const items = [
        { attendance: "10", total_hours: "100" },
        { attendance: "30", total_hours: "100" }
        ];
        const sortedItems = sortByPercentage(items);
        expect(sortedItems[0].attendance).toEqual("30");
        expect(sortedItems[1].attendance).toEqual("10");
    });

    it('should handle negative values', () => {
        const items = [
        { attendance: -10, total_hours: 100 },
        { attendance: 30, total_hours: -100 }
        ];
        const sortedItems = sortByPercentage(items);
        expect(sortedItems[0].percentage).toEqual(-10);
        expect(sortedItems[1].percentage).toEqual(-30);
    });

    it('should preserve original order for items with equal percentages', () => {
        const items = [
        { attendance: 10, total_hours: 100 },
        { attendance: 20, total_hours: 200 },
        { attendance: 30, total_hours: 100 }
        ];
        const sortedItems = sortByPercentage(items);
        expect(sortedItems[0].attendance).toEqual(30);
        expect(sortedItems[1].attendance).toEqual(10);
        expect(sortedItems[2].attendance).toEqual(20);
    });

    it('should return the same array when passed an array containing a single item', () => {
        const items = [{ attendance: 10, total_hours: 100 }];
        const sortedItems = sortByPercentage(items);
        expect(sortedItems).toEqual(items);
    });
});