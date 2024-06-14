import { convertToStringData, convertToStringDateWithTime } from "../convertToStringData"


describe('testing function that converts time an article was posted into a readable format', () => {
    it('prodcues a string date from a date object', () => {
        expect(convertToStringData('2024-04-29')).toBe('29 April 2024')
    })
    it('handles null values gracefully', () => {
        expect(convertToStringData(null)).toBeNull();
    })
})



describe('testing function that converts time the comment was posted in a readable format', () => {
    const stringDateSupplied = '2024-05-24 15:34:07.18397+00'
    it('produces a comment date successfully upon receiving the string from the database', () => {
        expect(convertToStringDateWithTime(stringDateSupplied)).toBe('24 May 2024 4:34 PM')
    })

    it('handles null values gracefully', () => {
        expect(convertToStringDateWithTime(null)).toBeNull();
    })
})