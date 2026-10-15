import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { THEMES } from "../../constants/theme";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center
          rounded-full text-foreground transition-colors
          hover:bg-accent hover:text-accent-foreground
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-ring sm:h-9 sm:w-9 sm:rounded-md"
        aria-label="Change theme"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />

        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

        <span className="sr-only">Change theme</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme(THEMES.LIGHT)}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme(THEMES.DARK)}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}