#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    const char* color;
    int count;
} ColorCount;

ColorCount max_colors[3] = {
    { "red", 12 },
    { "green", 13 },
    { "blue", 14}
};

int main() {
    int answer_part_1 = 0, answer_part_2 = 0;
    char line[256], *subset, *item, *subset_p, *item_p;

    FILE *file = fopen("input", "r");

    while (fgets(line, sizeof(line), file)) {
        int game_id;

        // extract game id from line
        sscanf(line, "Game %i", &game_id);

        // first split line by : and then by ; to get first subset
        strtok_r(line, ":", &subset_p);
        subset = strtok_r(NULL, ";", &subset_p);

        // record highest color count found for each color in subset
        ColorCount colors[3] = {
            { "red", 0 },
            { "green", 0 },
            { "blue", 0}
        };

        while(subset != NULL) {
            // split subset by , to get each cube in subset
            item = strtok_r(subset, ",", &item_p);

            while(item != NULL) {
                int count;
                char color[16];

                // extract cube count and color
                sscanf(item, "%i %s", &count, color);

                // update highest count for color if higher than previous
                for (int i = 0; i < 3; i++) {
                    if (strcmp(color, colors[i].color) == 0) {
                        if (count > colors[i].count) {
                            colors[i].count = count;
                        }
                    }
                }

                item = strtok_r(NULL, ",", &item_p);
            }

            subset = strtok_r(NULL, ";", &subset_p);
        }

        // for part 1 answer add game id if all colors counts are below max
        for (int i = 0; i < 3; i++) {
            if (colors[i].count > max_colors[i].count) {
                break;
            }

            if (i == 2) {
                answer_part_1 += game_id;
            }
        }
    
        // for part 2 answer multiply highest color counts
        answer_part_2 += 
            colors[0].count * 
            colors[1].count * 
            colors[2].count;
    }

    fclose(file);

    printf("part 1: %i\n", answer_part_1);
    printf("part 2: %i\n", answer_part_2);

    return 0;
}
