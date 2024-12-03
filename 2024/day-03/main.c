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
    int part1 = 0;

    const char *pattern = "mul\\([0-9]+,[0-9]+\\)";
    regex_t regex;
    regmatch_t matches[1];

    regcomp(&regex, pattern, REG_EXTENDED);

    char buff[512];
    FILE *file = fopen("input", "r");

    while(fgets(buff, sizeof(buff), file)) {
      char *p = buff;

      while (regexec(&regex, p, 1, matches, 0) == 0) {
          int start = matches[0].rm_so + 4;
          int end = matches[0].rm_eo - 1;

          char str[8];
          substr(str, p, start, end);
          printf("%s\n", str);

          char *token = strtok(str, ",");
          int a = atoi(token);
          token = strtok(NULL, ",");
          int b = atoi(token);
          int prod = a * b;

          printf("%i,%i=%i\n", a, b, prod);

          part1 += prod;

          p += end;
      }
    }

    fclose(file);

    printf("part 1: %i\n", part1);

    return 0;
}
