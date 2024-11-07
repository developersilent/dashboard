"use client";
import { useEffect, useState, forwardRef, useRef } from "react";
import Map from "@/components/custom/world-map";
import EmergencyList from "@/components/custom/emergency-list";
import MembersList from "@/components/custom/members-list";
import RecentUploads from "@/components/custom/recent-uploads";
import { Badge } from "@/components/ui/badge";
import { isBrowser } from "@/lib/help"; // Adjust the import path as needed
import type L from "leaflet";

const Dashboard = forwardRef<HTMLDivElement>((props, ref) => {
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [isClient, setIsClient] = useState<boolean>(false);
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (isBrowser()) {
            setIsClient(true);
            setWindowWidth(window.innerWidth);
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [isClient]);

    if (!isClient) {
        return (
            <div ref={ref} className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-4 md:p-6">
                <p>Loading...</p>
            </div>
        );
    }

    if (windowWidth < 770) {
        return (
            <div ref={ref} className="min-h-screen flex flex-col justify-center items-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-4 md:p-6">
                <p className={"text-foreground text-wrap"}>
                    This site is optimized for larger screens.
                </p>
                <p>
                    Please use a tablet, laptop, or desktop for the better experience.
                </p>
            </div>
        );
    }

    return (
        <main ref={ref} className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-4 md:p-6">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">

                {/* Merged Graph 1 and Graph 2 (Map takes two columns on large screens) */}
                <div
                     className="bg-[hsl(var(--card))] border-[hsl(var(--border))] overflow-hidden lg:col-span-2 h-[450px] rounded-lg">
                    <Map mapRef={mapRef} />
                </div>

                {/* Merged EmergencyList and ActivityList */}
                <section
                    className="bg-[hsl(var(--card))] border lg:px-3 border-[hsl(var(--border))] overflow-hidden h-[450px] grid-rows-subgrid rounded-lg">
                    <div className="w-full h-fit border-b py-2.5 flex items-center px-4 border-[hsl(var(--border))]">
                        <Badge className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">Emergency
                            SOS</Badge>
                    </div>
                    <EmergencyList/>
                </section>

                {/* Members List - This section takes half of the width */}
                <div
                    className="overflow-hidden h-[400px] col-span-full gap-5 flex w-full rounded-lg">
                    {/* Members List - Takes half of the width */}
                    <section
                        className="bg-[hsl(var(--card))] border-[hsl(var(--border))] overflow-hidden border px-3 rounded-lg w-1/2 h-full flex flex-col">
                        <div
                            className="w-full h-fit border-b py-2.5 flex items-center px-4 border-[hsl(var(--border))]">
                            <Badge
                                className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]">Members</Badge>
                        </div>
                        <MembersList />
                    </section>

                    {/* Recent Uploads - Takes half of the width */}
                    <section
                        className="bg-[hsl(var(--card))] border px-3 border-[hsl(var(--border))] overflow-hidden rounded-lg w-1/2 h-full flex flex-col">
                        <div
                            className="w-full h-fit border-b py-2.5 flex items-center px-4 border-[hsl(var(--border))]">
                            <Badge className="bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">Recent
                                Uploads</Badge>
                        </div>
                        <RecentUploads/>
                    </section>
                </div>

            </section>
        </main>
    );
});

Dashboard.displayName = "TestDashB";

export default Dashboard;