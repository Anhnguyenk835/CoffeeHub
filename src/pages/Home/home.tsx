import React, { useState, useEffect } from 'react';
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar"
import { getPlaces, CoffeeShop } from "../../lib/api";

interface CafeCardProps {
  id: string;
  name: string;
  address: string;
  hasImage: boolean;
  image?: string;
  rating?: number;
  type?: string[];
  onClick: () => void;
}

const Home: React.FC = () => {
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      try {
        // Use our typed database helper
        const data = await getPlaces();
        setCoffeeShops(data);
      } catch (err) {
        setError('Error fetching coffee shops data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeShops();
  }, []);

  const handleCafeClick = (id: string) => {
    navigate(`/detail/${id}`);
  };

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
            <h2 className="text-lg font-medium mb-4">Tags</h2>
            <div className="flex flex-wrap gap-3">
              {Array.from(new Set(coffeeShops.flatMap(shop => shop.type || []))).slice(0, 7).map((tag, i) => (
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
                  <span className="text-sm text-[#6c584c]">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coffee Shop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 text-center py-10">Loading coffee shops...</div>
            ) : error ? (
              <div className="col-span-3 text-center py-10 text-red-500">{error}</div>
            ) : coffeeShops.length === 0 ? (
              <div className="col-span-3 text-center py-10">No coffee shops found</div>
            ) : (
              coffeeShops.map((shop) => (
                <CafeCard 
                  key={shop.place_id}
                  id={shop.place_id}
                  name={shop.place_name} 
                  address={shop.place_address || 'No address provided'}
                  hasImage={Boolean(shop.thumbnail)}
                  image={shop.thumbnail}
                  rating={shop.rating || 0}
                  type={shop.type}
                  onClick={() => handleCafeClick(shop.place_id)}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

const CafeCard: React.FC<CafeCardProps> = ({ id, name, address, hasImage, image, rating = 0, type = [], onClick }) => {
  return (
    <div 
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#d9d9d9] cursor-pointer hover:shadow-md transition-shadow" 
      onClick={onClick}
    >
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
        <p className="text-sm text-[#6c584c]/80 mb-1">{address}</p>
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
                  fill={i < Math.round(rating) ? "#adc178" : "#d9d9d9"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              ))}
          </div>
          <span className="text-sm text-[#6c584c]/80 ml-1">{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}

export default Home;