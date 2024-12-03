#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <regex.h>

void substr(char *dest, char *src, int start, int end) {
    int len = 0;
    for (int i = start; i < end; i++) {
        dest[len++] = src[i];
    }
    dest[len] = '\0';
}

int main() {
    // regex which matches "do()" or "don't()" or "mul(1,2)"
    const char *pattern = "do\\(\\)|don't\\(\\)|mul\\([0-9]+,[0-9]+\\)";
    regex_t regex;
    regmatch_t matches[1];
    regcomp(&regex, pattern, REG_EXTENDED);

    int part1 = 0;
    int part2 = 0;
    int do_enabled = 1;
    char buff[2048];
    FILE *file = fopen("input", "r");

    // read each line from file
    while(fgets(buff, sizeof(buff), file)) {
      char *prog = buff;

      // loop through each regex match in the line
      while (regexec(&regex, prog, 1, matches, 0) == 0) {
          int start = matches[0].rm_so;
          int end = matches[0].rm_eo;
          int len = end - start;

          // determine typ based on match length
          if (len == 4) {
              do_enabled = 1;
          } else if (len == 7) {
              do_enabled = 0;
          } else if (prog[start] == 'm') {
            char str[8];
            substr(str, prog, start + 4, end - 1);

            int a = atoi(strtok(str, ","));
            int b = atoi(strtok(NULL, ","));
            int prod = a * b;

            // add product of all mul() matches (part 1)
            part1 += prod;

            // only add product of mul() matches when do enabled (part 2)
            if (do_enabled) {
              part2 += prod;
            }
          }

          prog += end;
      }
    }

    fclose(file);

    printf("part 1: %i\n", part1);
    printf("part 2: %i\n", part2);

    return 0;
}
