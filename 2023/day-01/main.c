#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char str_to_digit(char* str) {
    int len = strlen(str);

    if (len == 3) {
        if (strcmp(str, "one") == 0) {
            return '1';
        } else if (strcmp(str, "two") == 0) {
            return '2';
        } else if (strcmp(str, "six") == 0) {
            return '6';
        }
    } else if (len == 4) {
        if (strcmp(str, "four") == 0) {
            return '4';
        } else if (strcmp(str, "five") == 0) {
            return '5';
        } else if (strcmp(str, "nine") == 0) {
            return '9';
        }
    } else {
        if (strcmp(str, "three") == 0) {
            return '3';
        } else if (strcmp(str, "seven") == 0) {
            return '7';
        } else if (strcmp(str, "eight") == 0) {
            return '8';
        }
    }

    return '\0';
}

int solution(FILE *file, int part) {
    rewind(file);

    int answer = 0;
    char buff[256];
    char str_num[3];
    str_num[2] = '\0'; // string termination

    while (fgets(buff, sizeof(buff), file)) {    
        str_num[0] = '\0'; // indicate not assigned

        for (int i = 0; buff[i] != '\0'; i++) {
            char c = buff[i];

            if (c >= '1' && c <= '9') {
                if (str_num[0] == '\0') {
                    str_num[0] = c;
                }

                str_num[1] = c;
            }

            if (part != 2) continue;

            for (int j = 3; j <= 5; j++) {
                char str_seq[j];

                for (int k = 0; k < j; k++) {
                    str_seq[k] = buff[i + k];
                }

                char d = str_to_digit(str_seq);

                if (d != '\0') {
                    if (str_num[0] == '\0') {
                        str_num[0] = d;
                    }

                    str_num[1] = d;
                }
            }
        }

        answer += atoi(str_num);
    }

    return answer;
}

int main() {
    FILE *file = fopen("input", "r");

    int part1 = solution(file, 1);
    int part2 = solution(file, 2);

    fclose(file);

    printf("part 1: %i\n", part1);
    printf("part 2: %i\n", part2);

    return 0;
}
