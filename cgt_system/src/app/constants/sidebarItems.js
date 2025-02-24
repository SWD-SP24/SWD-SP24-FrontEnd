export const sidebarItems = {
  admin: [
    { title: "Dashboard", path: "/dashboard", icon: "bx bx-home" },
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
  member: [
    { title: "Dashboard", path: "/dashboard", icon: "bx bx-home" },
    {
      title: "Child Profiles",
      icon: "bx bx-face",
      submenu: [
        { title: "Child List", path: "/member/children" },
        { title: "Growth Tracking", path: "/member/growth-tracking" },
        { title: "Teething Management", path: "/member/teething" },
      ],
    },
    {
      title: "Vaccination",
      icon: "bx bx-injection",
      submenu: [
        { title: "Vaccination Schedule", path: "/member/vaccine/schedule" },
        { title: "Vaccination History", path: "/member/vaccine/history" },
      ],
    },
    {
      title: "Doctor Consultations",
      path: "/member/consultations",
      icon: "bx bx-chat",
    },
    {
      title: "Membership Packages",
      path: "/member/membership",
      icon: "bx bx-package",
    },
    { title: "Blog & Knowledge", path: "/member/blogs", icon: "bx bx-book" },
    { title: "Doctor Reviews", path: "/member/reviews", icon: "bx bx-star" },
    {
      title: "Account Settings",
      icon: "bx bx-user-circle",
      submenu: [
        { title: "Account", path: "/account-setting/account" },
        { title: "Security", path: "/account-setting/security" },
      ],
    },
  ],
};
