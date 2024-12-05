#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void read_input(char dest[][256]) {
    char buff[2048];
    FILE *file = fopen("input", "r");

    int row = 0;
    while(fgets(buff, sizeof(buff), file)) {
        int col = 0;
        while (buff[col] != '\0') {
            if (buff[col] == '\n') {
                dest[row][col] = '\0';
                break;
            }

            dest[row][col] = buff[col];
            col++;
        }
        row++;
    }
    dest[row][0] = '\0';

    fclose(file);
}

int find_word(char grid[][256], int row, int col, char *word, int dir[]) {
    for (int i = 0; i < strlen(word); i++) {
        if (grid[row][col] != word[i]) {
            return 0;
        }

        row += dir[0];
        col += dir[1];
    }

    return 1;
}

int main() {
    char grid[256][256];
    read_input(grid);

    int part1 = 0;
    int part2 = 0;

    int dirs[8][2] = {
        { -1,  0 }, // 0 = ↑
        { -1,  1 }, // 1 = ↗
        {  0,  1 }, // 2 = →
        {  1,  1 }, // 3 = ↘
        {  1,  0 }, // 4 = ↓
        {  1, -1 }, // 5 = ↙
        {  0, -1 }, // 6 = ←
        { -1, -1 }  // 7 = ↖
    };

    char str_xmas[5] = "XMAS";
    char str_mas[4] = "MAS";

    int row = 0;
    while (grid[row][0] != '\0') {
        int col = 0;

        while (grid[row][col] != '\0') {
            // check if any direction spells out "XMAS" (part 1)
            if (grid[row][col] == 'X') {
                for (int i = 0; i < 8; i++) {
                    if (find_word(grid, row, col, str_xmas, dirs[i])) {
                        part1++;
                    }
                }
            }

            // check if "A" is surrounded by "MAS" in diagonal directions (part 2)
            if (grid[row][col] == 'A') {
                if (
                    (
                        // check north east to south west
                        find_word(grid, row + 1, col - 1, str_mas, dirs[1]) ||
                        find_word(grid, row - 1, col + 1, str_mas, dirs[5])
                    ) && (
                        // check north west to south east
                        find_word(grid, row - 1, col - 1, str_mas, dirs[3]) ||
                        find_word(grid, row + 1, col + 1, str_mas, dirs[7])
                    )
                ) {
                    part2++;
                }
            }

            col++;
        }

        row++;
    }

    printf("part 1: %d\n", part1);
    printf("part 2: %d\n", part2);

    return 0;
}
