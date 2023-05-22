export const Schedule = {
    HALF_DAY: [
        [7, 25, 0, "block 1 starts"],
        [7, 58, 0, "block 1 ends"],
        [8, 3, 0, "block 2 starts"],
        [8, 36, 0, "block 2 ends"],
        [8, 41, 0, "block 3 starts"],
        [9, 14, 0, "block 3 ends"],
        [9, 19, 0, "block 4 starts"],
        [9, 52, 0, "block 4 ends"],
        [9, 57, 0, "block 5 starts"],
        [10, 30, 0, "block 5 ends"],
        [10, 35, 0, "block 6 starts"],
        [11, 8, 0, "block 6 ends"],
        [11, 13, 0, "block 7 starts"],
        [11, 46, 0, "school ends"]
    ],
    TUES_THUR: [
        [7, 25, 0, "block 1 starts"],
        [8, 19, 0, "block 1 ends"],
        [8, 24, 0, "block 2 starts"],
        [9, 18, 0, "block 2 ends"],
        [9, 23, 0, "block 3 starts"],
        [10, 17, 0, "block 3 ends"],
        [10, 22, 0, "block 4 starts"],
        [11, 16, 0, "block 4 ends"],
        [11, 21, 0, "block 5 starts"],
        [11, 21, 0, "lunch A starts"],
        [11, 41, 0, "lunch A ends"],
        [11, 42, 0, "lunch B starts"],
        [12, 3, 0, "lunch B ends"],
        [12, 4, 0, "lunch C starts"],
        [12, 25, 0, "lunch C ends"],
        [12, 26, 0, "lunch D starts"],
        [12, 47, 0, "block 5 ends"],
        [12, 52, 0, "block 6 starts"],
        [13, 46, 0, "block 6 ends"],
        [13, 51, 0, "block 7 starts"],
        [14, 45, 0, "school ends"]
    ],
    MON_WED_FRI: [
        [7, 25, 0, "block 1 starts"],
        [8, 14, 0, "block 1 ends"],
        [8, 19, 0, "block 2 starts"],
        [9, 8, 0, "block 2 ends"],
        [9, 13, 0, "block 3 starts"],
        [10, 2, 0, "block 3 ends"],
        [10, 7, 0, "advisory starts"],
        [10, 32, 0, "advisory ends"],
        [10, 37, 0, "block 4 starts"],
        [11, 26, 0, "block 4 ends"],
        [11, 31, 0, "block 5 / lunch A starts"],
        [11, 51, 0, "lunch A ends"],
        [11, 52, 0, "lunch B starts"],
        [12, 13, 0, "lunch B ends"],
        [12, 14, 0, "lunch C starts"],
        [12, 35, 0, "lunch C ends"],
        [12, 36, 0, "lunch D starts"],
        [12, 57, 0, "block 5 / lunch D ends"],
        [13, 2, 0, "block 6 starts"],
        [13, 51, 0, "block 6 ends"],
        [13, 56, 0, "block 7 starts"],
        [14, 45, 0, "school ends"]
    ],
    YEAR_SCHEDULE: [
        {
            "halfdays": [],
            "offdays": [2, 3, 4, 16, 30]
        },
        {
            "halfdays": [],
            "offdays": [13, 20, 21]
        },
        {
            "halfdays": [],
            "offdays": [6]
        },
        {
            "halfdays": [],
            "offdays": [3, 4, 5, 6, 7, 10]
        },
        {
            "halfdays": [23],
            "offdays": [1, 24, 25, 26, 27, 28, 29, 30, 31]
        },
        {
            "halfdays": [],
            "offdays": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
        },
        {
            "halfdays": [],
            "offdays": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
        },
        {
            "halfdays": [],
            "offdays": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
        },
        {
            "halfdays": [],
            "offdays": [5, 19]
        },
        {
            "halfdays": [27],
            "offdays": [3, 17, 28, 31]
        },
        {
            "halfdays": [],
            "offdays": [1, 23, 24, 25, 28]
        },
        {
            "halfdays": [],
            "offdays": [22, 23, 26, 27, 28, 29, 30]
        },
    ],
}