#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MAX 256

int has_symbol_neighbour(int y, int x, char lines[MAX][MAX]) {
    for (int yy = y - 1; yy <= y + 1; yy++) {
        for (int xx = x - 1; xx <= x + 1; xx++) {
            if (
                yy < 0 || // out of bounds
                xx < 0 || // out of bounds
                (yy == 0 && xx == 0) || // current position
                lines[yy][xx] == '.' || // not valid symbol
                lines[yy][xx] == '\n' || // new line
                lines[yy][xx] == '\0' || // end of line
                isdigit(lines[yy][xx]) // other digit
            ) {
                continue;
            }

            printf("symbol %c (%i, %i)\n", lines[yy][xx], yy, xx);
            return 1;
        }
    }

    return 0;
}

void find_full_number(int y, int *x, int *sum, char lines[MAX][MAX]) {
    int k = 0, has_symbol = 0;
    char num[4] = { 0, 0, 0, 0};

    while (1) {
        if (!isdigit(lines[y][*x + k])) {
            break;
        }

        num[k] = lines[y][*x + k];

        if (!has_symbol) {
            has_symbol = has_symbol_neighbour(y, *x + k, lines);
        }

        k++;
    }

    if (has_symbol) {
        *sum += atoi(num);
    }

    *x += k;
}

int main() {
    FILE *file;
    char line[MAX];
    char lines[MAX][MAX];

    file = fopen("input", "r");

    int i = 0;
    while (fgets(line, sizeof(line), file)) {
        strcpy(lines[i], line);
        i++;
    }

    fclose(file);

    int sum = 0;

    for (int y = 0; y < MAX; y++) {
        if (lines[y][0] == '\0') {
            break;
        }

        for (int x = 0; x < MAX; x++) {
            if (lines[y][x] == '\0') {
                break;
            }

            if (!isdigit(lines[y][x])) {
                continue;
            }

            find_full_number(y, &x, &sum, lines);
        }
    }

    printf("sum: %i\n", sum);

    return 0;
}