"use client";
import { Building, User2, Projector, Weight, Brain, SquareActivity } from 'lucide-react'; // Import your icons
import { FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import NavItem from './navItem';
import { Progress } from "@/components/ui/progress";
import { Button } from '../ui/button';

// Define the structure of each navigation item
interface NavItemData {
  href: string;
  icon: FC<React.SVGProps<SVGSVGElement>>; // SVG icon type
  label: string;
}

const PrincipalReportNav: FC = () => {
  const router = useRouter();
  const path = usePathname();

  const items: NavItemData[] = [
    { href: '/principal-report/add', icon: Building, label: 'Students' },
    { href: '/principal-report/add/employees', icon: User2, label: 'Employees' },
    { href: '/principal-report/add/ttbl', icon: Projector, label: 'TTBL' },
    { href: '/principal-report/add/workload', icon: Weight, label: 'Workload' },
    { href: '/principal-report/add/hcd', icon: Brain, label: 'HCD' },
    { href: '/principal-report/add/activity', icon: SquareActivity, label: 'Activity' },
  ];

  const currentIndex = items.findIndex((item) => item.href === path);

  // Function to handle navigation for "Next" and "Back"
  const handleNavigate = (index: number) => {
    if (index >= 0 && index < items.length) {
      router.push(items[index].href);
    }
  };

  return (
    <div className="flex items-top justify-between py-4">
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={() => handleNavigate(currentIndex - 1)}
        disabled={currentIndex <= 0} // Disable if no previous item
      >
        Back
      </Button>

      {/* Navigation Items with Progress Bar */}
      <div className="flex justify-between items-center py-4 relative w-1/2 mx-auto bg-secondary/10 px-6 rounded-full overflow-clip">
        {items.map((item, index) => (
          <div key={index} className="relative flex flex-col items-center">
            {/* Navigation Item */}
            <NavItem
              active={currentIndex >= index}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          </div>
        ))}

        {/* Progress Bar */}
        <div className="absolute top-1/3 mx-4 h-1 w-full -left-4 overflow-hidden px-9">
          <Progress
            className="h-1"
            value={(currentIndex + 1) * (100 / items.length)} // Updated for percentage
          />
        </div>
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        onClick={() => handleNavigate(currentIndex + 1)}
        disabled={currentIndex >= items.length - 1} // Disable if no next item
      >
        Next
      </Button>
    </div>
  );
};

export default PrincipalReportNav;
