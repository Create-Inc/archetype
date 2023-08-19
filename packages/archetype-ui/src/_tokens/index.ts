import { createArchetypeTokens } from "@createinc/archetype";

import { colors } from "./colors";
import { typography } from "./typography";

export const tokens = createArchetypeTokens("all", { colors, typography });
