export const sidebarItems = {
  admin: [
    { title: "Dashboard", path: "/admin/dashboard", icon: "bx bx-home" },
    {
      title: "User Management",
      icon: "bx bx-user",
      submenu: [
        { title: "User List", path: "/admin/users" },
        { title: "Doctor Management", path: "/admin/doctors" },
        { title: "Parent Management", path: "/admin/parents" },
      ],
    },
    {
      title: "Membership Packages",
      icon: "bx bx-dollar-circle",
      path: "/admin/membership-packages",
    },
    { title: "Blog", path: "/admin/blog", icon: "bx bx-book-content" },
    { title: "FAQ", path: "/admin/faq", icon: "bx bx-question-mark" },
    {
      title: "Account Settings",
      icon: "bx bx-user-circle",
      submenu: [
        { title: "Account", path: "/admin/account-setting/account" },
        { title: "Security", path: "/admin/account-setting/security" },
        {
          title: "Billing & Plans",
          path: "/admin/account-setting/billing-plans",
        },
      ],
    },
  ],
  doctor: [
    { title: "Dashboard", path: "/doctor/dashboard", icon: "bx bx-home" },
    {
      title: "Consultations",
      icon: "bx bx-message-rounded-dots",
      submenu: [
        { title: "New Requests", path: "/doctor/consultations/new" },
        {
          title: "Consultation History",
          path: "/doctor/consultations/history",
        },
      ],
    },
    {
      title: "Patient Profiles",
      icon: "bx bx-file",
      submenu: [
        { title: "Child List", path: "/doctor/children" },
        { title: "Growth Tracking", path: "/doctor/growth-tracking" },
      ],
    },
    { title: "Blog & Knowledge", path: "/doctor/blogs", icon: "bx bx-book" },
    { title: "Parent Reviews", path: "/doctor/reviews", icon: "bx bx-star" },
    { title: "Profile", path: "/doctor/profile", icon: "bx bx-user-circle" },
  ],
  parent: [
    { title: "Dashboard", path: "/parent/dashboard", icon: "bx bx-home" },
    {
      title: "Child Profiles",
      icon: "bx bx-baby-carriage",
      submenu: [
        { title: "Child List", path: "/parent/children" },
        { title: "Growth Tracking", path: "/parent/growth-tracking" },
        { title: "Teething Management", path: "/parent/teething" },
      ],
    },
    {
      title: "Vaccination",
      icon: "bx bx-syringe",
      submenu: [
        { title: "Vaccination Schedule", path: "/parent/vaccine/schedule" },
        { title: "Vaccination History", path: "/parent/vaccine/history" },
      ],
    },
    {
      title: "Doctor Consultations",
      path: "/parent/consultations",
      icon: "bx bx-chat",
    },
    {
      title: "Membership Packages",
      path: "/parent/membership",
      icon: "bx bx-package",
    },
    { title: "Blog & Knowledge", path: "/parent/blogs", icon: "bx bx-book" },
    { title: "Doctor Reviews", path: "/parent/reviews", icon: "bx bx-star" },
    { title: "Profile", path: "/parent/profile", icon: "bx bx-user-circle" },
  ],
};
