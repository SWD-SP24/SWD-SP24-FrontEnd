export const sidebarItems = {
  admin: [
    { title: "Dashboard", path: "/admin/dashboard", icon: "bx bx-home" },
    {
      title: "User Management",
      icon: "bx bx-user",
      path: "/admin/users",
    },
    {
      title: "Membership Packages",
      icon: "bx bx-dollar-circle",
      path: "/admin/membership-packages",
    },
    {
      title: "Account Settings",
      icon: "bx bx-user-circle",
      submenu: [
        { title: "Account", path: "/account-setting/account" },
        { title: "Security", path: "/account-setting/security" },
      ],
    },
  ],
  doctor: [
    { title: "Dashboard", path: "/dashboard", icon: "bx bx-home" },
    {
      title: "Consultations",
      icon: "bx bx-message-rounded-dots",
      path: "/doctor/consultations",
    },
    { title: "Parent Reviews", path: "/doctor/reviews", icon: "bx bx-star" },
    {
      title: "Account Settings",
      icon: "bx bx-user-circle",
      submenu: [
        { title: "Account", path: "/account-setting/account" },
        { title: "Security", path: "/account-setting/security" },
      ],
    },
  ],
  member: [
    { title: "Dashboard", path: "/dashboard", icon: "bx bx-home" },
    {
      title: "Child Management",
      icon: "bx bx-face",
      path: "/member/children",
    },
    {
      title: "Doctor Consultations",
      path: "/member/consultations",
      icon: "bx bx-chat",
    },
    {
      title: "Account Settings",
      icon: "bx bx-user-circle",
      submenu: [
        { title: "Account", path: "/account-setting/account" },
        { title: "Security", path: "/account-setting/security" },
        {
          title: "Billing & Plans",
          path: "/account-setting/billing-and-plans",
        },
      ],
    },
  ],
};
