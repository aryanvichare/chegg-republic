import { FC } from "react";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ChatHistory from "@/components/dashboard/ChatHistory";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
  return (
    <Container className='w-full'>
      <div className='flex-1 space-y-4 pt-6'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
          <div className='flex items-center space-x-2'>
            <Link href='/welcome'>
              <Button>Create New Chat</Button>
            </Link>
          </div>
        </div>
      </div>
      <ChatHistory />
    </Container>
  );
};

export default DashboardPage;
