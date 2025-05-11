import React, { useState, useEffect } from 'react';
import { Star, MapPin, Phone, Clock, Heart, Share2, Coffee, Users, Wifi, Music, ExternalLink } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import { getPlaceById, getImagesByPlaceId, CoffeeShop, CoffeeShopImage } from "../../lib/api";

interface Amenity {
  icon: React.ReactNode;
  name: string;
}

export default function DetailPage() {
  const { id } = useParams();
  const [coffeeShop, setCoffeeShop] = useState<CoffeeShop | null>(null);
  const [coffeeShopImages, setCoffeeShopImages] = useState<CoffeeShopImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const fetchCoffeeShopDetail = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Use our typed database helpers
        const data = await getPlaceById(id);
        setCoffeeShop(data);

        const imagesData = await getImagesByPlaceId(id);
        setCoffeeShopImages(imagesData);
      } catch (err) {
        setError('Error fetching coffee shop details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeShopDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6c584c]"></div>
        </div>
      </div>
    );
  }

  if (error || !coffeeShop) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Coffee Shop Not Found</h1>
            <p className="text-gray-600">The coffee shop you're looking for doesn't exist or couldn't be loaded.</p>
            <Link to="/home" className="mt-4 inline-block px-4 py-2 bg-[#adc178] text-white rounded-lg">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const amenities: Amenity[] = [
    { icon: <Coffee className="w-5 h-5" />, name: coffeeShop.type && coffeeShop.type.length > 0 ? coffeeShop.type[0] : "Coffee Shop" },
    { icon: <Wifi className="w-5 h-5" />, name: "Free WiFi" },
    { icon: <Users className="w-5 h-5" />, name: "Group Seating" },
    { icon: <Music className="w-5 h-5" />, name: "Music" }
  ];

  const imagesToShow = coffeeShopImages.length > 0 
    ? coffeeShopImages 
    : coffeeShop.thumbnail ? [{ image_id: 'thumbnail', place_id: id || '', img_title: 'Thumbnail', img_url: coffeeShop.thumbnail }] 
    : [];

  const googleMapsUrl = coffeeShop.latitude && coffeeShop.longitude
    ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241636840473!2d${coffeeShop.longitude}!3d${coffeeShop.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzI3LjguOCJOIDEwNsKwNDEnNTIuNyJF!5e0!3m2!1sen!2s!4v1653381355625!5m2!1sen!2s`
    : '';

  const googleMapsWithMarkerUrl = coffeeShop.latitude && coffeeShop.longitude
    ? `https://maps.google.com/maps?q=${encodeURIComponent(coffeeShop.place_name)},${coffeeShop.latitude},${coffeeShop.longitude}&t=&z=17&ie=UTF8&iwloc=&output=embed`
    : '';

  const mapUrl = googleMapsWithMarkerUrl || googleMapsUrl;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="container mx-auto max-w-6xl">
          {/* Image Gallery*/}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              {/* Main image */}
              <div className="lg:w-2/3 h-[400px]">
                {imagesToShow.length > 0 ? (
                  <img 
                    src={imagesToShow[selectedImage]?.img_url} 
                    alt={imagesToShow[selectedImage]?.img_title || coffeeShop.place_name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                    <Coffee className="w-16 h-16 text-gray-300" />
                  </div>
                )}
              </div>
              
              {/* Thumbnails*/}
              <div className="lg:w-1/3 grid grid-cols-2 gap-2 h-[400px] overflow-y-auto">
                {imagesToShow.map((image, index) => (
                  <div 
                    key={image.image_id} 
                    className={`relative h-[190px] cursor-pointer ${index === selectedImage ? 'ring-2 ring-[#adc178]' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image.img_url} 
                      alt={`${coffeeShop.place_name} - ${image.img_title}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{coffeeShop.place_name}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{coffeeShop.rating || 'N/A'}</span>
                </div>
                <span>•</span>
                <span>{coffeeShop.price_range || 'Price not available'}</span>
                <span>•</span>
                <div className="flex flex-wrap gap-2">
                  {coffeeShop.type && coffeeShop.type.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-[#adc178]/10 text-[#6c584c] rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#adc178] text-[#6c584c] hover:bg-[#adc178]/10 transition-colors">
                <Heart className="w-5 h-5" />
                Save
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#adc178] text-[#6c584c] hover:bg-[#adc178]/10 transition-colors">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-3 lg:col-span-2 space-y-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">
                  {coffeeShop.place_name} is located at {coffeeShop.place_address}. 
                  {coffeeShop.type && coffeeShop.type.length > 0 && 
                    ` This place is known for being a ${coffeeShop.type.join(', ')}.`}
                  {coffeeShop.rating && ` It has an average rating of ${coffeeShop.rating} stars.`}
                </p>
              </div>

              {/* Map */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Location</h2>
                <div className="rounded-lg overflow-hidden h-[400px] bg-gray-100">
                  {coffeeShop.latitude && coffeeShop.longitude ? (
                    <div className="h-full w-full relative">
                      <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        onLoad={() => setMapLoaded(true)}
                      ></iframe>
                      
                      {!mapLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6c584c]"></div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <MapPin className="w-12 h-12 text-[#6c584c] mb-4" />
                      <p className="text-center text-gray-600 mb-2">{coffeeShop.place_address}</p>
                      <p className="text-center text-gray-600 mb-4">
                        Coordinates: {parseFloat(coffeeShop.latitude || '0').toFixed(6)}, {parseFloat(coffeeShop.longitude || '0').toFixed(6)}
                      </p>
                      <a 
                        href={`https://www.google.com/maps?q=${coffeeShop.latitude},${coffeeShop.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#adc178] text-white rounded-lg hover:bg-[#adc178]/90 transition-colors"
                      >
                        View on Google Maps
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Information */}
            <div className="col-span-3 lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#6c584c] mt-1" />
                    <div>
                      <p className="text-gray-600">{coffeeShop.place_address}</p>
                      <a 
                        href={coffeeShop.place_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#adc178] text-sm hover:underline"
                      >
                        Get directions
                      </a>
                    </div>
                  </div>
                  
                  {coffeeShop.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[#6c584c] mt-1" />
                      <div>
                        <p className="text-gray-600">{coffeeShop.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {coffeeShop.website && (
                    <div className="flex items-start gap-3">
                      <ExternalLink className="w-5 h-5 text-[#6c584c] mt-1" />
                      <div>
                        <a 
                          href={coffeeShop.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#adc178] hover:underline"
                        >
                          Visit website
                        </a>
                      </div>
                    </div>
                  )}

                  {coffeeShop.online_order_link && (
                    <div className="mt-4">
                      <a 
                        href={coffeeShop.online_order_link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block w-full py-2 px-4 bg-[#adc178] text-white text-center rounded-lg hover:bg-[#adc178]/90 transition-colors"
                      >
                        Order Online
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Amenities</h3>
                <div className="space-y-3">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#adc178]/10 text-[#6c584c]">
                        {amenity.icon}
                      </div>
                      <span className="text-gray-600">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 