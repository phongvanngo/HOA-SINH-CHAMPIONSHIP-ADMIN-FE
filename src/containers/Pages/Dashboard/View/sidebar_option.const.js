import MailIcon from '@material-ui/icons/Mail';
import { DashboardRoutes } from "./../../../../routes.const";

export const SidebarOption = [
    {
        title: "Ca thi",
        path: DashboardRoutes.COMPETITION_MANAGEMENT,
        icon: () => <MailIcon />
    },
    {
        title: "Đề thi",
        path: DashboardRoutes.EXAM_MANAGEMENT,
        icon: () => <MailIcon />
    },
    {
        title: "Thí sinh",
        path: DashboardRoutes.USER_MANAGEMENT,
        icon: () => <MailIcon />
    },
    {
        title: "Trường đại học",
        path: DashboardRoutes.UNIVERSITY_MANAGEMENT,
        icon: () => <MailIcon />
    },
]