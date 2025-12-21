import React from "react";
import { useChartData } from "@/Utils/Hooks/useChart";
import {
  BarChart, Bar,
  PieChart, Pie, Cell,
  LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

// Palet Colors
const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

// Komponen Custom Tooltip 
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg text-sm">
        <p className="font-bold text-gray-700 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="font-medium">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Komponen Wrapper Card untuk setiap Chart
const ChartCard = ({ title, children, className = "" }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col ${className}`}>
    <h3 className="text-gray-700 font-bold text-lg mb-6">{title}</h3>
    <div className="flex-1 w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  </div>
);

const Dashboard = () => {
  const { data = {}, isLoading } = useChartData();

  const {
    students = [],
    genderRatio = [],
    registrations = [],
    gradeDistribution = [],
    lecturerRanks = [],
  } = data;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-indigo-600 font-semibold animate-pulse">Memuat Data Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header Dashboard */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Akademik</h1>
        <p className="text-gray-500 mt-1">Ringkasan statistik data mahasiswa dan dosen.</p>
      </div>

      {/* Grid Layout Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        
        {/* Trend Pendaftaran (Line Chart) */}
        <ChartCard title="Trend Pendaftaran Mahasiswa" className="lg:col-span-8">
          <LineChart data={registrations}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            <Line 
              type="monotone" 
              dataKey="total" 
              name="Jumlah Pendaftar"
              stroke="#6366f1" 
              strokeWidth={3}
              dot={{ r: 4, fill: "#6366f1", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ChartCard>

        {/* Rasio Gender (Pie Chart) */}
        <ChartCard title="Rasio Gender" className="lg:col-span-4">
          <PieChart>
            <Pie
              data={genderRatio}
              dataKey="count"
              nameKey="gender"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
            >
              {genderRatio.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ChartCard>

        {/* Mahasiswa per Fakultas (Bar Chart) */}
        <ChartCard title="Mahasiswa per Fakultas" className="lg:col-span-6">
          <BarChart data={students} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="faculty" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
            <Bar dataKey="count" name="Jumlah Mahasiswa" fill="#10b981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>

        {/* Distribusi Nilai (Radar Chart) */}
        <ChartCard title="Distribusi Nilai Jurusan" className="lg:col-span-3">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={gradeDistribution}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name="Nilai A" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
            <Radar name="Nilai B" dataKey="B" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
            <Legend iconType="rect" wrapperStyle={{fontSize: '10px', paddingTop: '10px'}} />
            <Tooltip />
          </RadarChart>
        </ChartCard>

        {/* Pangkat Dosen (Area Chart) */}
        <ChartCard title="Kepangkatan Dosen" className="lg:col-span-3">
          <AreaChart data={lecturerRanks}>
            <defs>
              <linearGradient id="colorLecturer" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="rank" hide />
            <YAxis hide />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <Tooltip content={<CustomTooltip />} />
            <Area 
                type="monotone" 
                dataKey="count" 
                name="Jumlah Dosen"
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorLecturer)" 
            />
            <p className="text-center mt-2 text-xs text-gray-500">
                Distribusi berdasarkan jabatan fungsional
            </p>
          </AreaChart>
        </ChartCard>

      </div>
    </div>
  );
};

export default Dashboard;