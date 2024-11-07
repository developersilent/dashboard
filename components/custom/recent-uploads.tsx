import {ScrollArea} from "@/components/ui/scroll-area";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {database} from "@/db";
import Link from "next/link";

export default function RecentUploads() {
    const db = database.recentUploads
    return (
        <ScrollArea
            className="h-[250px] md:h-[300px] flex-grow w-full pb-9 pt-1 bg-[hsl(var(--card))] border-[hsl(var(--border))] rounded-lg">
            <div className="space-y-2">
                {db.map((upload) => (
                    <div key={upload.id} className="flex items-center p-2 border-b border-[hsl(var(--border))]">
                        {/* Avatar Section */}
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={upload.avatar} alt={upload.user}/>
                            <AvatarFallback className="bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                                {upload.user[0]}
                            </AvatarFallback>
                        </Avatar>

                        {/* User and File Information */}
                        <div className="ml-4 space-y-1 flex flex-col gap-[0.7px]">
                            <p className="text-xs font-medium leading-none text-[hsl(var(--foreground))]">
                                {upload.user}
                            </p>
                            <Link className="text-xs text-[hsl(var(--muted-foreground))] text-[clamp(0.5rem,_0.5vw,_0.5rem)] line-clamp-1" href={upload.uploadedImageUrl}>view upload</Link>
                        </div>

                        {/* Time Badge */}
                        <Badge
                            variant="secondary"
                            className="text-nowrap ml-auto mr-1 max-sm:bg-yellow-500 text-[hsl(var(--secondary-foreground))] bg-[hsl(var(--destructive))]"
                        >
                            {upload.time}
                        </Badge>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}