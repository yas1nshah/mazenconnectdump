import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { Badge } from '../ui/badge';

// Define a type for the icon prop (React component)
interface NavItemProps {
  active: boolean;
  href: string;
  icon: FC<React.SVGProps<SVGSVGElement>>; // Type for SVG icon component
  label: string;
}

const NavItem: FC<NavItemProps> = ({active, href, icon: Icon, label }) => {
  const path = usePathname();
  // const isActive = path === href;

  return (
    <Link href={href} className="flex flex-col items-center space-y-2">
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full z-20 transition-all duration-300 ${
          active ? 'bg-primary' : 'bg-secondary'
        }`}
      >
        <Icon className={`h-8 w-8 transition-all duration-300 ${active ? 'text-primary-foreground' : 'text-secondary-foreground'}`} />
      </div>
      <Badge variant={active ? 'default' : 'outline'}>{label}</Badge>
    </Link>
  );
};

export default NavItem;
