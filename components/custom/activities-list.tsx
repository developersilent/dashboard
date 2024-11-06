import { Badge } from "@/components/ui/badge"; // Assuming you're using your UI library
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Assuming you're using your Avatar component
import { ScrollArea } from "@/components/ui/scroll-area"; // Assuming you have a ScrollArea component

export default function ActivityList() {
    // Example of dummy activity data
    const activities = [
        {
            id: 1,
            user: "John Doe",
            action: "uploaded a new file",
            timestamp: "2024-11-06 10:30 AM",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg", // Use any avatar image URL
            type: "Upload",
            status: "Active",

        },
    ];

    return (
        <div className="space-y-4">
            {/* Scrollable Area for Activity List */}
            <ScrollArea className="h-[300px] md:h-[400px] w-full pb-8 pt-2 overflow-auto scrollbar-thin">
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))]">
                            {/* Avatar */}
                            <div className="flex items-center">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={activity.avatar} alt={activity.user} />
                                    <AvatarFallback>{activity.user[0]}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1 flex flex-col justify-center gap-[0.7px]">
                                    <p className="text-xs font-medium">{activity.user}</p>
                                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                                </div>
                            </div>

                            {/* Badge with Status */}
                            <Badge
                                className="ml-auto mr-2"
                            >
                               View
                            </Badge>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
