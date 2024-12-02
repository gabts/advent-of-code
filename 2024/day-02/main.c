#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int solution_part_1() {
    char buff[256];
    int answer = 0;

    FILE *file = fopen("input", "r");

    while (fgets(buff, sizeof(buff), file)) {
        int curr = atoi(strtok(buff, " "));
        char* next = strtok(NULL, " ");
        int dir = 0;
        int safe = 1;

        while (next != NULL) {
            int n = atoi(next);
            int diff = abs(curr - n);

            if (diff < 1 || diff > 3) {
                safe = 0;
                break;
            }

            if (dir == 0) {
                dir = n > curr ? 1 : -1;
            } else if ((dir == 1 && n < curr) || (dir == -1 && n > curr) ) {
                safe = 0;
                break;
            }

            curr = n;
            next = strtok(NULL, " ");
        }

        if (safe) {
            answer++;
        }
    }

    return answer;
}

int main() {
    int part1 = solution_part_1();

    printf("part 1: %i\n", part1);

    return 0;
}
