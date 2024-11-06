import {ScrollArea} from "@/components/ui/scroll-area";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {database} from "@/db";

export default function EmergencyList() {
    const db = database.sosHelp
    return (
        <ScrollArea
            className="h-[250px] md:h-[450px] max-sm:h-[250px] w-full pb-12 pt-1 bg-[hsl(var(--card))] border-[hsl(var(--border))] rounded-lg"
        >
            <div className="space-y-2">
                {db.map((alert) => (
                    <div
                        key={alert.id}
                        className="flex items-center p-2 border-b border-[hsl(var(--border))]"
                    >
                        {/* Avatar Section */}
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={alert.avatar} alt={alert.user} />
                            <AvatarFallback className="bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                                {alert.user[0]}
                            </AvatarFallback>
                        </Avatar>

                        {/* User Information */}
                        <div className="ml-4 space-y-1 flex flex-col items-center gap-[0.7px]">
                            <p className="text-xs font-medium leading-none text-[hsl(var(--foreground))]">
                                {alert.user}
                            </p>
                            <p className="text-xs text-[hsl(var(--muted-foreground))]">{alert.type}</p>
                        </div>

                        {/* Time Badge */}
                        <Badge
                            variant="destructive"
                            className="ml-auto mr-2 text-[hsl(var(--destructive-foreground))] bg-[hsl(var(--destructive))]"
                        >
                            {alert.time}
                        </Badge>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}