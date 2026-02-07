"use client";
import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MessageInfo from "@/components/dashboard/section/MessageInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const dynamic = "force-dynamic";

function MessageContent() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <MessageInfo />
      </DashboardLayout>
    </>
  );
}

export default function page() {
  return (
    <Suspense
      fallback={
        <>
          <MobileNavigation2 />
          <DashboardLayout>
            <div className='text-center py-5'>
              <span className='spinner-border' role='status'>
                <span className='visually-hidden'>טוען...</span>
              </span>
            </div>
          </DashboardLayout>
        </>
      }>
      <MessageContent />
    </Suspense>
  );
}
