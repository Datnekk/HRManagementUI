import {
  Tabs,
  Card,
  Group,
  Text,
  Badge,
  ThemeIcon,
  Box,
  Progress,
  Grid,
  Button,
  Select,
} from "@mantine/core";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { serviceClient } from "~/services/axios";
import { asyncRunSafe } from "~/utils/other";
import { requireAuth } from "~/server/auth.server"; // Import requireAuth
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  IconClock,
  IconClockHour4,
  IconTrendingUp,
  IconCalendarStats,
  IconCalendarEvent,
  IconCalendar,
  IconCash,
  IconCoin,
} from "@tabler/icons-react";

export async function loader({ request }: LoaderFunctionArgs) {
  const { id, accessToken } = await requireAuth(request);

  const [userAttendanceError, userAttendanceResult] = await asyncRunSafe(
    serviceClient.get(`/Attendance/GetAttendanceByUserId/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );

  const [leaveRequestError, leaveRequestResult] = await asyncRunSafe(
    serviceClient.get(`/LeaveRequest/GetLeaveRequestByUserId/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );

  // Add salary data fetch
  const [salaryError, salaryResult] = await asyncRunSafe(
    serviceClient.get(`/Salary/${id}/my-salary`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );

  console.log(id);
  if (userAttendanceError) {
    console.error("Attendance API Error:", {
      message: userAttendanceError.message,
      status: userAttendanceError.response?.status,
      statusText: userAttendanceError.response?.statusText,
      data: userAttendanceError.response?.data,
      url: `/GetAttendanceByUserId/${id}`,
    });
    throw new Error(
      `Failed to load attendance data: ${userAttendanceError.message}`
    );
  }

  const userAttendances = userAttendanceResult?.data || [];
  const leaveRequests = leaveRequestResult?.data || [];

  // Thử các cấu trúc dữ liệu khác nhau
  let salaryData = salaryResult?.data || [];

  // Nếu data nằm trong nested object
  if (
    salaryResult?.data &&
    !Array.isArray(salaryResult?.data) &&
    typeof salaryResult?.data === "object"
  ) {
    salaryData =
      salaryResult.data.salaries ||
      salaryResult.data.items ||
      salaryResult.data.result ||
      salaryResult.data;
  }

  // Debug salary data
  console.log("Raw salary result:", salaryResult);
  console.log("Salary data:", salaryData);
  console.log("Salary data type:", typeof salaryData);
  console.log("Is array:", Array.isArray(salaryData));

  const now = new Date();
  const currentMonth = now.getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const currentYear = now.getFullYear();
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  let currentWork = 0,
    currentOT = 0;
  let lastWork = 0,
    lastOT = 0;

  // Calculate work and OT hours
  userAttendances.forEach((a: any) => {
    const d = new Date(a.AttendanceDate);
    const month = d.getMonth();
    const year = d.getFullYear();

    if (month === currentMonth && year === currentYear) {
      currentWork += a.WorkHours;
      currentOT += a.OvertimeHours;
    } else if (month === lastMonth && year === lastMonthYear) {
      lastWork += a.WorkHours;
      lastOT += a.OvertimeHours;
    }
  });

  // Calculate working days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const workingDaysInMonth = userAttendances.filter((a: any) => {
    const d = new Date(a.AttendanceDate);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  // Process calendar data
  const calendarData = new Map();

  // Add attendance data (for OT detection)
  userAttendances.forEach((a: any) => {
    const dateKey = new Date(a.AttendanceDate).toDateString();
    calendarData.set(dateKey, {
      type: a.OvertimeHours > 0 ? "overtime" : "working",
      overtimeHours: a.OvertimeHours,
      workHours: a.WorkHours,
    });
  });

  // Add leave requests
  leaveRequests.forEach((leave: any) => {
    const startDate = new Date(leave.StartDate);
    const endDate = new Date(leave.EndDate);

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateKey = new Date(d).toDateString();
      const status = leave.Status?.toLowerCase();

      if (status === "approved" || status === "pending") {
        calendarData.set(dateKey, {
          type: status === "approved" ? "approved_leave" : "pending_leave",
          leaveType: leave.LeaveType,
          reason: leave.Reason,
        });
      }
    }
  });

  // Process salary data for chart
  let salaryChartData = [];

  if (Array.isArray(salaryData)) {
    // Nếu là array
    salaryChartData = salaryData
      .map((salary: any) => {
        const [month, year] = salary.SalaryPeriod.split("/");
        return {
          period: `${month}/${year}`,
          monthName: `Tháng ${month}`,
          BaseSalary: salary.BaseSalary || 0,
          Allowances: salary.Allowances || 0,
          Bonus: salary.Bonus || 0,
          Deduction: salary.Deduction || 0,
          Tax: salary.Tax || 0,
          NetSalary: salary.NetSalary || 0,
          Total:
            (salary.BaseSalary || 0) +
            (salary.Allowances || 0) +
            (salary.Bonus || 0),
        };
      })
      .sort((a, b) => {
        const [monthA, yearA] = a.period.split("/");
        const [monthB, yearB] = b.period.split("/");
        return (
          new Date(parseInt(yearA), parseInt(monthA) - 1).getTime() -
          new Date(parseInt(yearB), parseInt(monthB) - 1).getTime()
        );
      });
  } else if (
    salaryData &&
    typeof salaryData === "object" &&
    salaryData.SalaryPeriod
  ) {
    // Nếu là object đơn lẻ
    const [month, year] = salaryData.SalaryPeriod.split("/");
    salaryChartData = [
      {
        period: `${month}/${year}`,
        monthName: `Tháng ${month}`,
        BaseSalary: salaryData.BaseSalary || 0,
        Allowances: salaryData.Allowances || 0,
        Bonus: salaryData.Bonus || 0,
        Deduction: salaryData.Deduction || 0,
        Tax: salaryData.Tax || 0,
        NetSalary: salaryData.NetSalary || 0,
        Total:
          (salaryData.BaseSalary || 0) +
          (salaryData.Allowances || 0) +
          (salaryData.Bonus || 0),
      },
    ];
  }

  console.log("Processed salary chart data:", salaryChartData);

  const chartData = [
    {
      name: "Tháng trước",
      WorkHours: lastWork,
      OvertimeHours: lastOT,
    },
    {
      name: "Tháng này",
      WorkHours: currentWork,
      OvertimeHours: currentOT,
    },
  ];

  return {
    chartData,
    currentWork,
    currentOT,
    lastWork,
    lastOT,
    workingDaysInMonth,
    daysInMonth,
    calendarData: Object.fromEntries(calendarData),
    currentMonth,
    currentYear,
    salaryChartData,
  };
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card shadow="md" p="sm" radius="md" withBorder>
        <Text fw={500} size="sm" mb="xs">
          {label}
        </Text>
        {payload.map((entry: any, index: number) => (
          <Group key={index} gap="xs" mb="xs">
            <Box
              w={12}
              h={12}
              style={{
                backgroundColor: entry.color,
                borderRadius: "2px",
              }}
            />
            <Text size="sm" c={entry.color}>
              {entry.name}: {entry.value} giờ
            </Text>
          </Group>
        ))}
      </Card>
    );
  }
  return null;
};

// Custom salary tooltip component
const SalaryTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    if (!data) return null;

    return (
      <Card
        shadow="md"
        p="md"
        radius="md"
        withBorder
        style={{ minWidth: "200px" }}
      >
        <Text fw={600} size="sm" mb="md">
          {label}
        </Text>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Group justify="space-between">
            <Text size="sm">Lương cơ bản:</Text>
            <Text size="sm" fw={500}>
              {data.BaseSalary?.toLocaleString()} VNĐ
            </Text>
          </Group>
          <Group justify="space-between">
            <Text size="sm">Phụ cấp:</Text>
            <Text size="sm" fw={500}>
              {data.Allowances?.toLocaleString()} VNĐ
            </Text>
          </Group>
          <Group justify="space-between">
            <Text size="sm">Thưởng:</Text>
            <Text size="sm" fw={500}>
              {data.Bonus?.toLocaleString()} VNĐ
            </Text>
          </Group>
          <Box
            style={{
              height: "1px",
              backgroundColor: "#e9ecef",
              margin: "8px 0",
            }}
          />
          <Group justify="space-between">
            <Text size="sm">Khấu trừ:</Text>
            <Text size="sm" fw={500} c="red">
              -{data.Deduction?.toLocaleString()} VNĐ
            </Text>
          </Group>
          <Group justify="space-between">
            <Text size="sm">Thuế:</Text>
            <Text size="sm" fw={500} c="red">
              -{data.Tax?.toLocaleString()} VNĐ
            </Text>
          </Group>
          <Box
            style={{
              height: "1px",
              backgroundColor: "#e9ecef",
              margin: "8px 0",
            }}
          />
          <Group justify="space-between">
            <Text size="sm" fw={600}>
              Lương thực nhận:
            </Text>
            <Text size="sm" fw={700} c="green">
              {data.NetSalary?.toLocaleString()} VNĐ
            </Text>
          </Group>
        </div>
      </Card>
    );
  }
  return null;
};

// Stats Card Component
const StatsCard = ({
  title,
  value,
  unit = "giờ",
  icon,
  color,
  change,
  progress,
}: {
  title: string;
  value: number;
  unit?: string;
  icon: React.ReactNode;
  color: string;
  change?: number;
  progress?: { current: number; total: number };
}) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Group justify="space-between" mb="md">
      <ThemeIcon size="lg" radius="md" color={color} variant="light">
        {icon}
      </ThemeIcon>
      {change !== undefined && (
        <Badge color={change >= 0 ? "green" : "red"} variant="light" size="sm">
          {change >= 0 ? "+" : ""}
          {change} {unit}
        </Badge>
      )}
    </Group>

    <Text size="xl" fw={700} mb="xs">
      {progress ? `${progress.current}/${progress.total}` : `${value} ${unit}`}
    </Text>

    <Text size="sm" c="dimmed" mb={progress ? "xs" : 0}>
      {title}
    </Text>

    {progress && (
      <Progress
        value={(progress.current / progress.total) * 100}
        color={color}
        size="sm"
        radius="md"
      />
    )}
  </Card>
);

// Custom Calendar Component
const CustomCalendar = ({
  year,
  month,
  calendarData,
  onDateChange,
}: {
  year: number;
  month: number;
  calendarData: any;
  onDateChange: (year: number, month: number) => void;
}) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const getDayColor = (date: Date) => {
    const dateKey = date.toDateString();
    const dayData = calendarData[dateKey];

    if (!dayData) return "transparent";

    switch (dayData.type) {
      case "approved_leave":
        return "#ff6b6b"; // Red
      case "pending_leave":
        return "#ffd43b"; // Yellow
      case "overtime":
        return "#339af0"; // Blue
      case "working":
        return "#51cf66"; // Light green
      default:
        return "transparent";
    }
  };

  const getDayTooltip = (date: Date) => {
    const dateKey = date.toDateString();
    const dayData = calendarData[dateKey];

    if (!dayData) return "";

    switch (dayData.type) {
      case "approved_leave":
        return `Nghỉ phép đã duyệt: ${dayData.leaveType}`;
      case "pending_leave":
        return `Nghỉ phép chờ duyệt: ${dayData.leaveType}`;
      case "overtime":
        return `Làm OT: ${dayData.overtimeHours}h`;
      case "working":
        return `Ngày làm việc: ${dayData.workHours}h`;
      default:
        return "";
    }
  };

  const goToPreviousMonth = () => {
    if (month === 0) {
      onDateChange(year - 1, 11);
    } else {
      onDateChange(year, month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      onDateChange(year + 1, 0);
    } else {
      onDateChange(year, month + 1);
    }
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <Box
          key={`empty-${i}`}
          style={{ height: "50px", border: "1px solid #e9ecef" }}
        />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const backgroundColor = getDayColor(date);
      const tooltip = getDayTooltip(date);

      days.push(
        <Box
          key={day}
          style={{
            height: "50px",
            border: "1px solid #e9ecef",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            backgroundColor: backgroundColor,
            cursor: tooltip ? "pointer" : "default",
          }}
          title={tooltip}
        >
          <Text
            size="sm"
            fw={500}
            c={backgroundColor !== "transparent" ? "white" : "dark"}
          >
            {day}
          </Text>
        </Box>
      );
    }

    return days;
  };

  return (
    <Box>
      {/* Calendar Header */}
      <Group justify="space-between" align="center" mb="md">
        <Button variant="subtle" onClick={goToPreviousMonth} size="sm">
          ‹ Tháng trước
        </Button>
        <Text size="lg" fw={600}>
          {monthNames[month]} {year}
        </Text>
        <Button variant="subtle" onClick={goToNextMonth} size="sm">
          Tháng sau ›
        </Button>
      </Group>

      {/* Calendar Grid */}
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "1px",
        }}
      >
        {/* Day headers */}
        {dayNames.map((dayName) => (
          <Box
            key={dayName}
            style={{
              height: "40px",
              backgroundColor: "#f8f9fa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #e9ecef",
              fontWeight: 600,
            }}
          >
            <Text size="sm" fw={600} c="dimmed">
              {dayName}
            </Text>
          </Box>
        ))}

        {/* Calendar days */}
        {renderCalendarDays()}
      </Box>
    </Box>
  );
};

export default function Statistical() {
  const {
    chartData,
    currentWork,
    currentOT,
    lastWork,
    lastOT,
    workingDaysInMonth,
    daysInMonth,
    calendarData,
    currentMonth,
    currentYear,
    salaryChartData,
  } = useLoaderData<typeof loader>();

  const [activeTab, setActiveTab] = useState("overview");
  const [calendarYear, setCalendarYear] = useState(currentYear);
  const [calendarMonth, setCalendarMonth] = useState(currentMonth);
  const [salaryChartType, setSalaryChartType] = useState("line"); // line or bar
  const [salaryDataType, setSalaryDataType] = useState("NetSalary"); // NetSalary, BaseSalary, Bonus, Total

  const workChange = currentWork - lastWork;
  const otChange = currentOT - lastOT;

  const handleDateChange = (year: number, month: number) => {
    setCalendarYear(year);
    setCalendarMonth(month);
  };

  const getSalaryColor = (dataType: string) => {
    switch (dataType) {
      case "BaseSalary":
        return "#339af0";
      case "Bonus":
        return "#69db7c";
      case "Total":
        return "#ff8cc8";
      case "NetSalary":
        return "#ffd43b";
      default:
        return "#339af0";
    }
  };

  const getSalaryLabel = (dataType: string) => {
    switch (dataType) {
      case "BaseSalary":
        return "Lương cơ bản";
      case "Bonus":
        return "Thưởng";
      case "Total":
        return "Tổng thu nhập";
      case "NetSalary":
        return "Lương thực nhận";
      default:
        return "Lương thực nhận";
    }
  };

  return (
    <Box p="xl">
      {/* Header */}
      <Group mb="xl" align="center">
        <ThemeIcon size="xl" radius="md" color="blue" variant="light">
          <IconCalendarStats size={24} />
        </ThemeIcon>
        <div>
          <Text size="xl" fw={700}>
            Thống kê chấm công
          </Text>
          <Text size="sm" c="dimmed">
            So sánh dữ liệu tháng hiện tại và tháng trước
          </Text>
        </div>
      </Group>

      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        variant="pills"
        radius="md"
      >
        <Tabs.List mb="xl">
          <Tabs.Tab value="overview" leftSection={<IconTrendingUp size={16} />}>
            Tổng quan
          </Tabs.Tab>
          <Tabs.Tab value="chart" leftSection={<IconCalendarStats size={16} />}>
            Biểu đồ chi tiết
          </Tabs.Tab>
          <Tabs.Tab value="calendar" leftSection={<IconCalendar size={16} />}>
            Lịch chấm công
          </Tabs.Tab>
          <Tabs.Tab value="salary" leftSection={<IconCash size={16} />}>
            Bảng lương
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview">
          {/* Stats Cards */}
          <Grid mb="xl">
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <StatsCard
                title="Giờ làm việc (Tháng này)"
                value={currentWork}
                icon={<IconClock size={20} />}
                color="blue"
                change={workChange}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <StatsCard
                title="Giờ OT (Tháng này)"
                value={currentOT}
                icon={<IconClockHour4 size={20} />}
                color="orange"
                change={otChange}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <StatsCard
                title="Ngày đã làm trong tháng"
                value={workingDaysInMonth}
                unit="ngày"
                icon={<IconCalendarEvent size={20} />}
                color="green"
                progress={{ current: workingDaysInMonth, total: daysInMonth }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <StatsCard
                title="Tỷ lệ chấm công"
                value={Math.round((workingDaysInMonth / daysInMonth) * 100)}
                unit="%"
                icon={<IconTrendingUp size={20} />}
                color="teal"
              />
            </Grid.Col>
          </Grid>

          {/* Quick Chart */}
          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Group justify="space-between" align="center" mb="lg">
              <div>
                <Text size="lg" fw={600}>
                  So sánh tháng hiện tại vs tháng trước
                </Text>
                <Text size="sm" c="dimmed">
                  Tổng quan về giờ làm việc và giờ OT
                </Text>
              </div>
            </Group>

            <div style={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barCategoryGap="20%"
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: "#e9ecef" }}
                    tickLine={{ stroke: "#e9ecef" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: "#e9ecef" }}
                    tickLine={{ stroke: "#e9ecef" }}
                    label={{ value: "Giờ", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    iconType="rect"
                  />
                  <Bar
                    dataKey="WorkHours"
                    stackId="a"
                    fill="#339af0"
                    name="Giờ làm việc"
                    radius={[0, 0, 4, 4]}
                  />
                  <Bar
                    dataKey="OvertimeHours"
                    stackId="a"
                    fill="#ff8cc8"
                    name="Giờ OT"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="chart">
          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Group justify="space-between" align="center" mb="lg">
              <div>
                <Text size="lg" fw={600}>
                  Biểu đồ chi tiết
                </Text>
                <Text size="sm" c="dimmed">
                  Phân tích chi tiết giờ làm việc và OT
                </Text>
              </div>
            </Group>

            <div style={{ height: 450 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barCategoryGap="15%"
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 14, fontWeight: 500 }}
                    axisLine={{ stroke: "#dee2e6", strokeWidth: 1 }}
                    tickLine={{ stroke: "#dee2e6" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: "#dee2e6", strokeWidth: 1 }}
                    tickLine={{ stroke: "#dee2e6" }}
                    label={{
                      value: "Số giờ",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle" },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: "30px" }}
                    iconType="rect"
                  />
                  <Bar
                    dataKey="WorkHours"
                    stackId="a"
                    fill="#4dabf7"
                    name="Giờ làm việc"
                    radius={[0, 0, 6, 6]}
                  />
                  <Bar
                    dataKey="OvertimeHours"
                    stackId="a"
                    fill="#69db7c"
                    name="Giờ OT"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Additional Stats */}
            <Grid mt="xl">
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Card
                  padding="md"
                  radius="md"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <Text size="sm" c="dimmed" mb="xs">
                    Tổng giờ làm việc
                  </Text>
                  <Text size="xl" fw={700} c="blue">
                    {currentWork + lastWork} giờ
                  </Text>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Card
                  padding="md"
                  radius="md"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <Text size="sm" c="dimmed" mb="xs">
                    Tổng giờ OT
                  </Text>
                  <Text size="xl" fw={700} c="orange">
                    {currentOT + lastOT} giờ
                  </Text>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="calendar">
          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Group justify="space-between" align="center" mb="lg">
              <div>
                <Text size="lg" fw={600}>
                  Lịch chấm công
                </Text>
                <Text size="sm" c="dimmed">
                  Xem chi tiết chấm công theo từng ngày
                </Text>
              </div>
            </Group>

            {/* Legend */}
            <Card
              padding="md"
              radius="md"
              style={{ backgroundColor: "#f8f9fa" }}
              mb="lg"
            >
              <Text size="sm" fw={500} mb="xs">
                Chú thích:
              </Text>
              <Group gap="lg">
                <Group gap="xs">
                  <Box
                    w={16}
                    h={16}
                    style={{ backgroundColor: "#ff6b6b", borderRadius: "4px" }}
                  />
                  <Text size="sm">Nghỉ phép đã duyệt</Text>
                </Group>
                <Group gap="xs">
                  <Box
                    w={16}
                    h={16}
                    style={{ backgroundColor: "#ffd43b", borderRadius: "4px" }}
                  />
                  <Text size="sm">Nghỉ phép chờ duyệt</Text>
                </Group>
                <Group gap="xs">
                  <Box
                    w={16}
                    h={16}
                    style={{ backgroundColor: "#339af0", borderRadius: "4px" }}
                  />
                  <Text size="sm">Ngày có OT</Text>
                </Group>
                <Group gap="xs">
                  <Box
                    w={16}
                    h={16}
                    style={{ backgroundColor: "#51cf66", borderRadius: "4px" }}
                  />
                  <Text size="sm">Ngày làm việc thường</Text>
                </Group>
              </Group>
            </Card>

            {/* Calendar */}
            <CustomCalendar
              year={calendarYear}
              month={calendarMonth}
              calendarData={calendarData}
              onDateChange={handleDateChange}
            />
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="salary">
          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Group justify="space-between" align="center" mb="lg">
              <div>
                <Text size="lg" fw={600}>
                  Bảng lương
                </Text>
                <Text size="sm" c="dimmed">
                  Theo dõi lương theo từng tháng
                </Text>
              </div>

              <Group gap="md">
                <Select
                  value={salaryDataType}
                  onChange={(value) => setSalaryDataType(value || "NetSalary")}
                  data={[
                    { value: "NetSalary", label: "Lương thực nhận" },
                    { value: "BaseSalary", label: "Lương cơ bản" },
                    { value: "Bonus", label: "Thưởng" },
                    { value: "Total", label: "Tổng thu nhập" },
                  ]}
                  placeholder="Chọn loại dữ liệu"
                  style={{ minWidth: "160px" }}
                />
                <Select
                  value={salaryChartType}
                  onChange={(value) => setSalaryChartType(value || "line")}
                  data={[
                    { value: "line", label: "Biểu đồ đường" },
                    { value: "bar", label: "Biểu đồ cột" },
                  ]}
                  placeholder="Chọn loại biểu đồ"
                  style={{ minWidth: "140px" }}
                />
              </Group>
            </Group>

            {salaryChartData.length > 0 ? (
              <div style={{ height: 450 }}>
                <ResponsiveContainer width="100%" height="100%">
                  {salaryChartType === "line" ? (
                    <LineChart
                      data={salaryChartData}
                      margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                    >
                      <XAxis
                        dataKey="monthName"
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: "#dee2e6", strokeWidth: 1 }}
                        tickLine={{ stroke: "#dee2e6" }}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: "#dee2e6", strokeWidth: 1 }}
                        tickLine={{ stroke: "#dee2e6" }}
                        label={{
                          value: "VNĐ",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle" },
                        }}
                        tickFormatter={(value) =>
                          `${(value / 1000).toFixed(0)}K`
                        }
                      />
                      <Tooltip content={<SalaryTooltip />} />
                      <Legend
                        wrapperStyle={{ paddingTop: "20px" }}
                        iconType="line"
                      />
                      <Line
                        type="monotone"
                        dataKey={salaryDataType}
                        stroke={getSalaryColor(salaryDataType)}
                        strokeWidth={3}
                        dot={{
                          fill: getSalaryColor(salaryDataType),
                          strokeWidth: 2,
                          r: 6,
                        }}
                        activeDot={{
                          r: 8,
                          stroke: getSalaryColor(salaryDataType),
                          strokeWidth: 2,
                        }}
                        name={getSalaryLabel(salaryDataType)}
                      />
                    </LineChart>
                  ) : (
                    <BarChart
                      data={salaryChartData}
                      margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                      barCategoryGap="15%"
                    >
                      <XAxis
                        dataKey="monthName"
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: "#dee2e6", strokeWidth: 1 }}
                        tickLine={{ stroke: "#dee2e6" }}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: "#dee2e6", strokeWidth: 1 }}
                        tickLine={{ stroke: "#dee2e6" }}
                        label={{
                          value: "VNĐ",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle" },
                        }}
                        tickFormatter={(value) =>
                          `${(value / 1000).toFixed(0)}K`
                        }
                      />
                      <Tooltip content={<SalaryTooltip />} />
                      <Legend
                        wrapperStyle={{ paddingTop: "20px" }}
                        iconType="rect"
                      />
                      <Bar
                        dataKey={salaryDataType}
                        fill={getSalaryColor(salaryDataType)}
                        name={getSalaryLabel(salaryDataType)}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            ) : (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "300px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                }}
              >
                <ThemeIcon
                  size="xl"
                  radius="md"
                  color="gray"
                  variant="light"
                  mb="md"
                >
                  <IconCoin size={32} />
                </ThemeIcon>
                <Text size="lg" fw={600} c="dimmed" mb="xs">
                  Chưa có dữ liệu lương
                </Text>
                <Text size="sm" c="dimmed">
                  Dữ liệu lương sẽ được hiển thị khi có thông tin từ hệ thống
                </Text>
              </Box>
            )}

            {/* Salary Summary Cards */}
            {salaryChartData.length > 0 && (
              <Grid mt="xl">
                <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
                  <Card
                    padding="md"
                    radius="md"
                    style={{ backgroundColor: "#e3f2fd" }}
                  >
                    <Group justify="space-between" align="center" mb="xs">
                      <Text size="sm" c="dimmed">
                        Lương TB/tháng
                      </Text>
                      <ThemeIcon size="sm" color="blue" variant="light">
                        <IconCash size={14} />
                      </ThemeIcon>
                    </Group>
                    <Text size="lg" fw={700} c="blue">
                      {(
                        salaryChartData.reduce(
                          (sum, item) => sum + item.NetSalary,
                          0
                        ) / salaryChartData.length
                      ).toLocaleString()}{" "}
                      VNĐ
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
                  <Card
                    padding="md"
                    radius="md"
                    style={{ backgroundColor: "#e8f5e8" }}
                  >
                    <Group justify="space-between" align="center" mb="xs">
                      <Text size="sm" c="dimmed">
                        Lương cao nhất
                      </Text>
                      <ThemeIcon size="sm" color="green" variant="light">
                        <IconTrendingUp size={14} />
                      </ThemeIcon>
                    </Group>
                    <Text size="lg" fw={700} c="green">
                      {Math.max(
                        ...salaryChartData.map((item) => item.NetSalary)
                      ).toLocaleString()}{" "}
                      VNĐ
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
                  <Card
                    padding="md"
                    radius="md"
                    style={{ backgroundColor: "#fff3e0" }}
                  >
                    <Group justify="space-between" align="center" mb="xs">
                      <Text size="sm" c="dimmed">
                        Tổng thưởng
                      </Text>
                      <ThemeIcon size="sm" color="orange" variant="light">
                        <IconCoin size={14} />
                      </ThemeIcon>
                    </Group>
                    <Text size="lg" fw={700} c="orange">
                      {salaryChartData
                        .reduce((sum, item) => sum + item.Bonus, 0)
                        .toLocaleString()}{" "}
                      VNĐ
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
                  <Card
                    padding="md"
                    radius="md"
                    style={{ backgroundColor: "#fce4ec" }}
                  >
                    <Group justify="space-between" align="center" mb="xs">
                      <Text size="sm" c="dimmed">
                        Tổng thu nhập
                      </Text>
                      <ThemeIcon size="sm" color="pink" variant="light">
                        <IconCash size={14} />
                      </ThemeIcon>
                    </Group>
                    <Text size="lg" fw={700} c="pink">
                      {salaryChartData
                        .reduce((sum, item) => sum + item.NetSalary, 0)
                        .toLocaleString()}{" "}
                      VNĐ
                    </Text>
                  </Card>
                </Grid.Col>
              </Grid>
            )}
          </Card>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
