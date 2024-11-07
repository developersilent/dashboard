import Map from "@/components/custom/Map";
import EmergencyList from "@/components/custom/emergency-list";
import MembersList from "@/components/custom/members-list";
import RecentUploads from "@/components/custom/recent-uploads";
import { Badge } from "@/components/ui/badge";
import ActivityList from "@/components/custom/activities-list";

export default function Component() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-4 md:p-6">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

                {/* Merged Graph 1 and Graph 2 */}
                <div  id="map" className="bg-[hsl(var(--card))] border-[hsl(var(--border))] overflow-hidden lg:col-span-2 grid-cols-2 h-[450px] rounded-lg">
                    {/*<Map />*/}
                </div>

                {/* Graph 3: Emergency SOS */}
                <section className="bg-[hsl(var(--card))] border-[hsl(var(--border))] overflow-hidden h-[450px] rounded-lg">
                    <div className="w-full h-fit border-b py-2.5 flex items-center px-4 border-[hsl(var(--border))]">
                        <Badge className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">Emergency SOS</Badge>
                    </div>
                    <EmergencyList />
                </section>

                {/* Graph 4: Members */}
                <section className="bg-[hsl(var(--card))] border-[hsl(var(--border))] overflow-hidden aspect-[4/3] rounded-lg">
                    <div className="w-full h-fit border-b py-2.5 flex items-center px-4 border-[hsl(var(--border))]">
                        <Badge className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]">Members</Badge>
                    </div>
                    <MembersList />
                </section>

                {/* Graph 5: Recent Uploads */}
                <section className="bg-[hsl(var(--card))] border-[hsl(var(--border))] overflow-hidden aspect-[4/3] rounded-lg">
                    <div className="w-full h-fit border-b py-2.5 flex items-center px-4 border-[hsl(var(--border))]">
                        <Badge className="bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">Recent Uploads</Badge>
                    </div>
                    <RecentUploads />
                </section>

                {/* New Section */}
                <section
                    className="bg-[hsl(var(--card))] border-[hsl(var(--border))] overflow-hidden aspect-[4/3] rounded-lg">
                    <div className="w-full h-fit border-b py-2.5 flex items-center px-4 border-[hsl(var(--border))]">
                        <Badge className="bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">Teams</Badge>
                    </div>
                    <ActivityList />
                </section>
            </section>
        </main>
    );
}
