import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router";
import { ModeToggle } from "./toggleMode";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CircleUser, Shield, Car, User, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Navigation links based on user roles
const getNavigationLinks = (role: string | undefined, status: string | undefined) => {
  // Public navigation for non-authenticated users
  const publicLinks = [
    { href: "/", label: "Home", role: "PUBLIC" },
    { href: "/about", label: "About Us", role: "PUBLIC" },
    { href: "/features", label: "Features", role: "PUBLIC" },
    { href: "/contact", label: "Contact", role: "PUBLIC" },
    { href: "/faq", label: "FAQ", role: "PUBLIC" },
  ];

  // Return public links if no role
  if (!role) return publicLinks;

  // Role-based navigation links
  const roleBasedLinks: Record<string, any[]> = {
    RIDER: [
      { href: "/rider/profile", label: "Dashboard", icon: null },
      { href: "/rides", label: "Book Ride", icon: null },
      { href: "/rider/profile", label: "My Rides", icon: null },
      { href: "/rider/profile", label: "Profile", icon: null },
      { href: "/contact", label: "Support", icon: null },
    ],
    DRIVER: [
      { href: "/driver/profile", label: "Dashboard", icon: null },
      { 
        href: "/driver/profile", 
        label: status === "offline" ? "Go Online" : "Ride Requests", 
        icon: Car,
        disabled: status === "offline"
      },
      { href: "/driver/profile", label: "Earnings", icon: null },
      { href: "/driver/profile", label: "Ride History", icon: null },
      { href: "/driver/profile", label: "Profile", icon: null },
    ],
    SUPER_ADMIN: [
      { href: "/admin/profile", label: "Dashboard", icon: null },
      { href: "/admin/profile", label: "User Management", icon: null },
      { href: "/admin/profile", label: "Ride Management", icon: null },
      { href: "/admin/profile", label: "Analytics", icon: null },
      { href: "/admin/profile", label: "Reports", icon: null },
      { href: "/admin/profile", label: "Profile", icon: null },
    ],
  };

  return roleBasedLinks[role] || publicLinks;
};

// Status badge component
const StatusBadge = ({ status, role }: { status: string; role: string }) => {
  if (role === "DRIVER") {
    return (
      <Badge 
        variant={status === "online" ? "default" : "secondary"}
        className="ml-2 text-xs"
      >
        {status === "online" ? "Online" : "Offline"}
      </Badge>
    );
  }
  
  if (status === "blocked" || status === "suspended") {
    return (
      <Badge variant="destructive" className="ml-2 text-xs">
        <AlertCircle className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  }
  
  return null;
};

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const userRole = data?.data?.role;
  const userStatus = data?.data?.status || data?.data?.availability; // Handle both status fields
  const userName = data?.data?.name || data?.user?.name;
  
  const navigationLinks = getNavigationLinks(userRole, userStatus);

  const handleLogout = async () => {
    await logout(undefined).unwrap();
    dispatch(authApi.util.resetApiState());
  };

  // Check if user is blocked/suspended and should be redirected
  const isBlocked = userStatus === "blocked" || userStatus === "suspended";
  
  // Get dashboard link based on role
  const getDashboardLink = (role: string) => {
    switch(role) {
      case "RIDER": return "/rider/profile";
      case "DRIVER": return "/driver/profile";
      case "SUPER_ADMIN": return "/admin/profile";
      default: return "/";
    }
  };

  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Left side (Logo + Mobile Menu Button) */}
        <div className="flex items-center gap-3">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12H20"
                    className="origin-center -translate-y-[6px] transition-all duration-300 group-aria-expanded:rotate-45 group-aria-expanded:translate-y-0"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 group-aria-expanded:opacity-0"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[6px] transition-all duration-300 group-aria-expanded:-rotate-45 group-aria-expanded:translate-y-0"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-48 p-2 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-1">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink 
                        asChild 
                        className={`py-2 px-3 rounded-md transition-colors flex items-center gap-2 ${
                          link.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent'
                        }`}
                      >
                        {link.disabled ? (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            {link.icon && <link.icon className="w-4 h-4" />}
                            {link.label}
                          </div>
                        ) : (
                          <Link to={link.href} className="flex items-center gap-2">
                            {link.icon && <link.icon className="w-4 h-4" />}
                            {link.label}
                          </Link>
                        )}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Logo */}
          <Link 
            to={userRole ? getDashboardLink(userRole) : "/"} 
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Logo />
          </Link>
        </div>

        {/* Center nav (only desktop) */}
        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList className="gap-6">
            {navigationLinks.map((link, index) => (
              <NavigationMenuItem key={index}>
                {link.disabled ? (
                  <div className="inline-flex items-center gap-2 text-muted-foreground/50 py-1.5 font-medium cursor-not-allowed">
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </div>
                ) : (
                  <NavigationMenuLink
                    asChild
                    className="text-muted-foreground hover:text-primary py-1.5 font-medium transition-colors flex items-center gap-2"
                  >
                    <Link to={link.href} className="inline-flex items-center gap-2">
                      {link.icon && <link.icon className="w-4 h-4" />}
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side (mode toggle + auth buttons) */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {data?.data?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full p-0 w-10 h-10 flex items-center justify-center relative"
                >
                  {data?.data?.picture ? (
                    <img
                      src={data.data.picture}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-secondary cursor-pointer flex items-center justify-center">
                      {userRole === "SUPER_ADMIN" ? (
                        <Shield className="w-5 h-5 text-foreground" />
                      ) : userRole === "DRIVER" ? (
                        <Car className="w-5 h-5 text-foreground" />
                      ) : (
                        <CircleUser className="w-5 h-5 text-foreground" />
                      )}
                    </div>
                  )}
                  
                  {/* Status indicator for drivers */}
                  {userRole === "DRIVER" && (
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${
                      userStatus === "online" ? "bg-green-500" : "bg-gray-400"
                    }`} />
                  )}
                  
                  {/* Alert indicator for blocked/suspended users */}
                  {isBlocked && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                  <span>{userName || "My Account"}</span>
                  <span className="text-xs text-muted-foreground font-normal flex items-center">
                    {userRole?.toLowerCase()} account
                    <StatusBadge status={userStatus} role={userRole} />
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* Role-specific menu items */}
                {!isBlocked && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link className="flex items-center gap-2" to={getDashboardLink(userRole)}>
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link className="flex items-center gap-2" to={`/${userRole.toLowerCase()}/profile`}>
                        <CircleUser className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    
                    {userRole === "DRIVER" && (
                      <DropdownMenuItem asChild>
                        <Link className="flex items-center gap-2" to="/driver/profile">
                          <Car className="w-4 h-4 mr-2" />
                          Earnings
                        </Link>
                      </DropdownMenuItem>
                    )}
                    
                    {userRole === "RIDER" && (
                      <DropdownMenuItem asChild>
                        <Link className="flex items-center gap-2" to="/rider/profile">
                          <Car className="w-4 h-4 mr-2" />
                          My Rides
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </>
                )}
                
                <DropdownMenuSeparator />
                
                {/* Support/Help */}
                <DropdownMenuItem asChild>
                  <Link to="/contact">
                    Help & Support
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}