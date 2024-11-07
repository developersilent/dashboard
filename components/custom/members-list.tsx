import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ScrollArea} from "@/components/ui/scroll-area";
import {database} from "@/db";

export default function MembersList() {
    const db = database.users;
    return (
        <>
            <ScrollArea
                className="h-[250px] flex-grow md:h-[300px] w-full pb-9 pt-1 bg-[hsl(var(--card))] border-[hsl(var(--border))] rounded-lg">
                <div className="space-y-2">
                    {db.map((member) => (
                        <div key={member.id}
                             className="flex items-center justify-center p-2 border-b border-[hsl(var(--border))]">
                            {/* Avatar Section */}
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={member.avatar} alt={member.user}/>
                                <AvatarFallback className="bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                                    {member.user[0]}
                                </AvatarFallback>
                            </Avatar>

                            {/* Member Info */}
                            <div className="ml-4 flex justify-center flex-col gap-[0.7px]">
                                <p className="text-xs font-medium leading-none text-[hsl(var(--foreground))]">
                                    {member.user}
                                </p>
                                <p className="text-xs text-[hsl(var(--muted-foreground))]">{member.email}</p>
                            </div>

                            {/* Status Badge */}
                            <Badge
                                variant={member.status === 'Active' ? 'default' : 'secondary'}
                                className={`ml-auto mr-2 ${member.status === 'Active' ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]'}`}
                            >
                                {member.status}
                            </Badge>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </>

    )
}