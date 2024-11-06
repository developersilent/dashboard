// 'use client'
//
// import MembersList from "@/components/custom/members-list";
// import EmergencyList from "@/components/custom/emergency-list";
// import RecentUploads from "@/components/custom/recent-uploads";
//
// export default function Dashboard() {
//     return (
//         <div className="min-h-screen w-full p-4 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
//             <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[minmax(200px,auto)] h-screen">
//
//                 {/* Map Card - 50% width on large screens */}
//                 <section className="bg-[hsl(var(--card))] border-[hsl(var(--border))] lg:col-span-1 xl:col-span-2 border">
//                     {/* <Map /> */}
//                 </section>
//
//                 {/* Emergency Alert Card */}
//                 <section className="bg-[hsl(var(--card))] border-[hsl(var(--border))] lg:col-span-1 xl:col-span-1 border p-2">
//                     <EmergencyList />
//                 </section>
//
//                 {/* Recent Uploads Card - Span 2 columns on large screens */}
//                 <section className="bg-[hsl(var(--card))] border-[hsl(var(--border))] lg:col-span-1 xl:col-span-2 border">
//                     <RecentUploads />
//                 </section>
//
//                 {/* Members Card */}
//                 <section className="bg-[hsl(var(--card))] border-[hsl(var(--border))] lg:col-span-1 xl:col-span-1 border">
//                     <MembersList />
//                 </section>
//
//             </div>
//         </div>
//     );
// }