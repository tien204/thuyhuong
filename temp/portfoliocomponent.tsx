import React from 'react';
import { 
  Star, 
  Users, 
  Target, 
  Megaphone, 
  Calendar, 
  BarChart2, 
  Tag, 
  Search, 
  TrendingUp, 
  Play,
  Shapes,
  PlayCircle
} from 'lucide-react';

const achievements = [
  {
    icon: <Shapes className="w-6 h-6" strokeWidth={1.5} />,
    text: "Phụ trách triển khai hoạt động branding cho nhiều khách hàng đa ngành, đảm bảo định vị và tính nhất quán thương hiệu."
  },
  {
    icon: <Search className="w-6 h-6" strokeWidth={1.5} />,
    text: "Nghiên cứu thị trường & insight khách hàng, xây dựng định hướng chiến lược và phối hợp triển khai campaign đa kênh cùng team Creative."
  },
  {
    icon: <TrendingUp className="w-6 h-6" strokeWidth={1.5} />,
    text: "Tối ưu hiệu quả chiến dịch và duy trì quan hệ khách hàng, góp phần giúp khách hàng BĐS tái ký 4 lần (gia hạn đến 2027)."
  },
  {
    icon: <Megaphone className="w-6 h-6" strokeWidth={1.5} />,
    text: 'Lên concept và tổ chức thành công Year End Event (~70 khách) với chủ đề "Phi mã".'
  },
  {
    icon: <Play className="w-6 h-6" fill="currentColor" strokeWidth={0} />,
    text: 'Triển khai campaign Tết "Thêu hoa dệt gấm" cho here.olong; phát triển và truyền thông các BST mới cho Cocolama; đồng thời sản xuất nhiều video đạt 500.000+ views cho Lạc Coffee & Desserts và Trần Sĩ Đức.'
  }
];

const tags = [
  { icon: <Tag className="w-4 h-4" fill="currentColor" />, label: "Branding" },
  { icon: <Target className="w-4 h-4" />, label: "Strategy" },
  { icon: <Megaphone className="w-4 h-4" fill="currentColor" strokeWidth={0} />, label: "Campaign" },
  { icon: <PlayCircle className="w-4 h-4" fill="currentColor" />, label: "Content" },
  { icon: <Calendar className="w-4 h-4" />, label: "Event" }
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-4 md:p-8 font-sans text-gray-800">
      
      {/* Main Card Container */}
      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-6xl p-8 md:p-12 flex flex-col lg:flex-row gap-12 lg:gap-20 border border-gray-100">
        
        {/* Left Column */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <h1 className="text-[3.5rem] font-bold text-[#152542] leading-tight tracking-tight">
            Titan Agency
          </h1>
          <div className="flex items-center gap-3 mt-4 text-[#596780] font-medium text-lg">
            <div className="w-3.5 h-3.5 rounded-full bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            Thời gian làm việc: 2024 – 2025
          </div>

          {/* Center Graphic Card */}
          <div className="mt-10 relative bg-[#F4F8FD] rounded-[2rem] p-10 flex flex-col items-center justify-center border border-blue-50 shadow-inner min-h-[420px]">
            
            {/* Wrapper for Circle and Icons to align perfectly */}
            {}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] pointer-events-none mt-[-20px]">
              
              {/* Dashed background circle */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#c6d7f4] opacity-80"></div>
              
              {/* Decorative small dots on the circle */}
              <div className="absolute top-[13.4%] left-[25%] w-1.5 h-1.5 bg-[#3B82F6] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-[13.4%] left-[75%] w-1.5 h-1.5 bg-[#3B82F6] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-[50%] left-[0%] w-1.5 h-1.5 bg-[#3B82F6] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-[50%] left-[100%] w-1.5 h-1.5 bg-[#3B82F6] rounded-full -translate-x-1/2 -translate-y-1/2"></div>

              {/* Floating Icons exactly on the circle path */}
              {/* Target - Top Center (0 degrees) */}
              <div className="absolute top-[0%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] text-[#3B82F6] border border-[#e2e8f0] pointer-events-auto">
                <Target className="w-5 h-5" strokeWidth={2} />
              </div>
              
              {/* Users - Top Left (-60 degrees) -> x=6.7%, y=25% */}
              <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] text-[#8CA3C9] border border-[#e2e8f0] pointer-events-auto">
                <Users className="w-5 h-5" strokeWidth={2} />
              </div>
              
              {/* Megaphone - Top Right (60 degrees) -> x=93.3%, y=25% */}
              <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] text-[#8CA3C9] border border-[#e2e8f0] pointer-events-auto">
                <Megaphone className="w-5 h-5" strokeWidth={2} />
              </div>
              
              {/* BarChart - Bottom Left (-120 degrees) -> x=6.7%, y=75% */}
              <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] text-[#8CA3C9] border border-[#e2e8f0] pointer-events-auto">
                <BarChart2 className="w-5 h-5" strokeWidth={2} />
              </div>
              
              {/* Calendar - Bottom Right (120 degrees) -> x=93.3%, y=75% */}
              <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] text-[#8CA3C9] border border-[#e2e8f0] pointer-events-auto">
                <Calendar className="w-5 h-5" strokeWidth={2} />
              </div>
            </div>

            {/* Central Number */}
            <div className="relative z-10 flex flex-col items-center mb-5 mt-[-10px]">
              <span className="text-[140px] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-[#438DF9] to-[#2462E9] drop-shadow-2xl select-none" style={{ filter: 'drop-shadow(0px 15px 25px rgba(36, 98, 233, 0.25))' }}>
                11
              </span>
            </div>

            <div className="relative z-10 bg-[#3273F6] text-white px-8 py-3 rounded-full font-medium shadow-[0_8px_20px_rgba(50,115,246,0.3)] mt-2 text-lg">
              Dự án duy trì cùng lúc
            </div>
            
            <p className="relative z-10 mt-6 text-center text-[#596780] font-medium text-[1.1rem]">
              Có thể đảm nhiệm và duy trì <br />
              <strong className="text-[#2462E9] font-bold">11 dự án</strong> cùng lúc
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {tags.map((tag, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-full text-[#3273F6] font-medium text-sm shadow-sm hover:shadow-md transition-shadow cursor-default"
              >
                {tag.icon}
                {tag.label}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-[1.2] flex flex-col pt-4">
          
          {/* Section Header */}
          <div className="flex items-center gap-5 mb-10">
            <div className="relative w-14 h-14 rounded-full flex items-center justify-center text-[#3273F6]">
              {/* Outer faint circle */}
              <div className="absolute inset-0 bg-[#EFF5FF] rounded-full"></div>
              {/* Star Icon */}
              <Star className="w-7 h-7 relative z-10" strokeWidth={1.5} />
            </div>
            <h2 className="text-[1.7rem] font-bold text-[#152542]">
              Vai trò & thành tựu nổi bật
            </h2>
          </div>

          {/* Achievement List */}
          <div className="flex flex-col">
            {achievements.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex gap-6 pb-7 ${
                  idx !== achievements.length - 1 ? 'border-b border-dashed border-gray-300 mb-7' : ''
                }`}
              >
                {/* Icon Box */}
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#F4F8FD] flex items-center justify-center text-[#3273F6]">
                  {item.icon}
                </div>
                
                {/* Text content */}
                <div className="flex-1 pt-1.5">
                  <p className="text-[#3F4C68] leading-[1.7] text-[1.05rem]">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}