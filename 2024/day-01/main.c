#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b) {
    return (*(const int*)a - *(const int*)b);
}

typedef struct {
    int left[1000];
    int right[1000];
    int size;
} Input;

// read input from file, split into left and right arrays and sort them
Input parse_input() {
    char buff[256];

    Input in = {
        .left = {},
        .right = {},
        .size = 0
    };

    FILE *file = fopen("input", "r");

    while (fgets(buff, sizeof(buff), file)) {
        int n1, n2;
        sscanf(buff, "%d   %d", &n1, &n2);
        in.left[in.size] = n1;
        in.right[in.size] = n2;
        in.size++;
    }

    fclose(file);

    qsort(in.left, in.size, sizeof(int), compare);
    qsort(in.right, in.size, sizeof(int), compare);

    return in;
}

// add together the difference between each pair of numbers
int solution_part_1(Input in) {
    int answer = 0;

    for (int i = 0; i < in.size; i++) {
        answer += abs(in.left[i] - in.right[i]);
    }

    return answer;
}

// add each number in left array times how many times it appears in the right array
int solution_part_2(Input in) {
    int answer = 0;
    int i = 0, j = 0;

    // iterate through left array
    while (i < in.size) {
        int n1 = in.left[i];
        int count = 0;

        // find how many times n1 appears in right array
        while (j < in.size) {
            int n2 = in.right[j];

            if (n2 > n1) {
                break;
            } else if (n1 == n2) {
                count++;
            }

            j++;
            continue;;
        }

        if (count == 0) {
            i++;
            continue;
        }

        // find how many times n1 repeats in left array
        int k = i;
        while (k < in.size && in.left[k] == n1) {
            k++;
        }

        int repeat = k - i;
        i += repeat;
        answer += (n1 * count) * repeat;
    }

    return answer;
}

int main() {
    Input in = parse_input();

    int part1 = solution_part_1(in);
    int part2 = solution_part_2(in);

    printf("part 1: %i\n", part1);
    printf("part 2: %i\n", part2);

    return 0;
}
