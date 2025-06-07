import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './sidebar';
import { AlignHorizontalJustifyCenterIcon, Smartphone } from 'lucide-react';
import { StoreSwitcher } from './store-switcher';
import React from 'react';
import { useLocation } from 'react-router';

// This is sample data.
const data = {
  teams: [
    {
      name: 'InnovaCraft',
      logo: 'https://i.pinimg.com/736x/21/94/29/219429747dc271e879e24471e8d341a4.jpg',
    },
  ],
  navMain: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: AlignHorizontalJustifyCenterIcon,
          isActive: true,
        },
        {
          title: 'Products',
          url: '/products',
          icon: Smartphone,
        },
        {
          title: 'Metrics',
          url: '#',
          icon: AlignHorizontalJustifyCenterIcon,
        },
        {
          title: 'Security',
          url: '#',
          icon: AlignHorizontalJustifyCenterIcon,
        },
        {
          title: 'API',
          url: '#',
          icon: AlignHorizontalJustifyCenterIcon,
        },
        {
          title: 'Quick Setup',
          url: '#',
          icon: AlignHorizontalJustifyCenterIcon,
        },
        {
          title: 'Payment Links',
          url: '#',
          icon: AlignHorizontalJustifyCenterIcon,
        },
        {
          title: 'Archive',
          url: '#',
          icon: AlignHorizontalJustifyCenterIcon,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader className="rounded-md h-16 max-md:mt-2 mb-2 justify-center">
        <StoreSwitcher />
        <hr className="border-t border-border mx-2 -mt-px" />
      </SidebarHeader>
      <SidebarContent className="-mt-2">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="uppercase text-muted-foreground/65">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => {
                  const isActive = location.pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className="group/menu-button group-data-[collapsible=icon]:px-[5px]! font-medium gap-3 h-9 [&>svg]:size-auto"
                        tooltip={item.title}
                        isActive={isActive}
                      >
                        <a href={item.url}>
                          {item.icon && (
                            <item.icon
                              className="text-muted-foreground/65 group-data-[active=true]/menu-button:text-primary"
                              size={22}
                              aria-hidden="true"
                            />
                          )}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}
