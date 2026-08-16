
function PropertyCard({ property, role, onApply }) {
  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden
        border border-gray-100 shadow-sm
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300"
    >

      {/* Property Image */}
      {/* Property Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">

      {property.images && property.images.length > 0 ? (
        <img
          src={`http://127.0.0.1:8000${
            property.images.find(image => image.is_profile)?.image_url ||
            property.images[0].image_url
          }`}
          alt={property.title}
          className="w-full h-full object-cover
            group-hover:scale-105 transition-transform
            duration-500"
        />
      ) : (
        <div className="h-full flex items-center justify-center
          bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200">

          <span className="text-7xl">
            🏠
          </span>

        </div>
      )}

      {/* Availability */}
      <div className="absolute top-4 left-4">

        <span className="inline-flex items-center gap-2
          bg-white/95 backdrop-blur-sm
          text-green-700 text-xs font-bold
          px-3 py-1.5 rounded-full shadow-sm">

          <span className="w-2 h-2 bg-green-500 rounded-full" />

          Available

        </span>

      </div>

      </div>

      {/* Property Information */}
      <div className="p-6">

        {/* Title */}
        <div className="mb-3">

          <h3 className="text-xl font-bold text-gray-900
            group-hover:text-blue-600 transition-colors">

            {property.title}

          </h3>

        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed
          line-clamp-2 min-h-[40px]">

          {property.description}

        </p>

        {/* Location */}
        <div className="flex items-center gap-2
          text-gray-600 mt-5">

          <div className="w-8 h-8 rounded-lg bg-blue-50
            flex items-center justify-center">

            <span className="text-sm">
              📍
            </span>

          </div>

          <span className="text-sm font-medium">
            {property.location || "Location not specified"}
          </span>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100
          mt-5 pt-5">

          <div className="flex justify-between
            items-center gap-4">

            {/* Price */}
            <div>

              <p className="text-2xl font-bold text-blue-600">
                R{Number(property.price).toLocaleString()}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Monthly rent
              </p>

            </div>

            {/* Tenant Apply Button */}
            {role === "tenant" && (
              <button
                onClick={() => onApply(property.id)}
                className="bg-blue-600 text-white
                  px-5 py-2.5 rounded-xl
                  font-semibold text-sm
                  hover:bg-blue-700
                  active:scale-95
                  transition-all duration-200
                  shadow-sm hover:shadow-md"
              >
                Apply Now
              </button>
            )}
            {/* Landlord */} 
            {role === "landlord" && ( 
              <button 
              onClick={() => onDelete(property.id)}
               className="bg-gray-700 text-white px-5 py-2.5 
               rounded-lg font-semibold hover:bg-blue-600 transition" > 
               Delete </button> )}
            
            


            {/* Landlord indicator */}
            {role === "landlord" && (
              <span className="text-xs font-medium
                text-gray-400">
                Your listing
              </span>
            )}

          </div>

        </div>

      </div>

    </div>
  )
}

export default PropertyCard

