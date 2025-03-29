import React from 'react';
import { Search } from "lucide-react"
import Sidebar from "../../components/sidebar"

interface CafeCardProps {
  name: string;
  hasImage: boolean;
  image?: string;
}

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6c584c]/60 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter a name or place"
                className="w-full pl-10 pr-4 py-3 rounded-full border border-[#d9d9d9] focus:outline-none focus:ring-1 focus:ring-[#a98467]"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Tagssssssss</h2>
            <div className="flex flex-wrap gap-3">
              {Array(7)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center px-4 py-2 rounded-full border border-[#d9d9d9] bg-white">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <path
                        d="M13.5 5.5C13.5 6.88071 12.3807 8 11 8C9.61929 8 8.5 6.88071 8.5 5.5C8.5 4.11929 9.61929 3 11 3C12.3807 3 13.5 4.11929 13.5 5.5Z"
                        fill="#6c584c"
                      />
                      <path
                        d="M2 13.5V3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V13.5C14 13.7761 13.7761 14 13.5 14H2.5C2.22386 14 2 13.7761 2 13.5Z"
                        stroke="#6c584c"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span className="text-sm text-[#6c584c]">Cozy</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Coffee Shop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CafeCard 
              name="Highlands Coffee" 
              hasImage={true} 
              image="/images/highlands-coffee.png" 
            />
            
            <CafeCard 
              name="The Coffee House" 
              hasImage={true} 
              image="/images/the-coffee-house.png" 
            />

            <CafeCard 
              name="Phúc Long Coffee" 
              hasImage={true} 
              image="/images/phuc-long.png" 
            />

            <CafeCard 
              name="Trung Nguyên Legend" 
              hasImage={true} 
              image="/images/trung-nguyen.png" 
            />

            <CafeCard 
              name="Cộng Cà Phê" 
              hasImage={true} 
              image="/images/cong-cafe.png" 
            />

            <CafeCard 
              name="Urban Station Coffee" 
              hasImage={true} 
              image="/images/urban-station.png" 
            />

            <CafeCard 
              name="Cheese Coffee" 
              hasImage={true} 
              image="/images/cheese-coffee.png" 
            />

            <CafeCard 
              name="Milano Coffee" 
              hasImage={true} 
              image="/images/milano-coffee.png" 
            />

            <CafeCard 
              name="AHA Cafe" 
              hasImage={true} 
              image="/images/aha-cafe.png" 
            />
          </div>
        </div>
      </main>
    </div>
  )
}

const CafeCard: React.FC<CafeCardProps> = ({ name, hasImage, image }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#d9d9d9]">
      {hasImage ? (
        <div className="h-48 relative">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="h-48 bg-[#d9d9d9]/30 flex items-center justify-center">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImNoZWNrZXJib2FyZCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBmaWxsPSIjZjBmMGYwIiBkPSJNMCAwaDEwdjEwSDB6TTEwIDEwaDEwdjEwSDEweiIvPjxwYXRoIGZpbGw9IiNlNmU2ZTYiIGQ9Ik0xMCAwaDEwdjEwSDEwek0wIDEwaDEwdjEwSDB6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NoZWNrZXJib2FyZCkiLz48L3N2Zz4=')]"></div>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-medium text-lg text-[#000000]">{name}</h3>
        <p className="text-sm text-[#6c584c]/80 mb-1">Location</p>
        <div className="flex items-center">
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#adc178"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              ))}
          </div>
          <span className="text-sm text-[#6c584c]/80 ml-1">5 (26)</span>
        </div>
      </div>
    </div>
  )
}

export default Home;

