
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import Navbar from "../components/Navbar"

function CreateProperty() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: ""
  })

  const [images, setImages] = useState([])
  const [profileImageIndex, setProfileImageIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files)

    if (selectedFiles.length === 0) {
      return
    }

    setImages(selectedFiles)
    setProfileImageIndex(0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (images.length === 0) {
      alert("Please upload at least one property image.")
      return
    }

    setLoading(true)

    try {
      const data = new FormData()

      data.append("title", formData.title)
      data.append("description", formData.description)
      data.append("price", Number(formData.price))
      data.append("location", formData.location)

      images.forEach((image) => {
        data.append("images", image)
      })

      data.append("profile_image_index", profileImageIndex)

      await api.post("/properties/", data)

      alert("Property created successfully!")

      navigate("/properties")

    } catch (error) {
      console.error("CREATE PROPERTY ERROR:", error)
      console.error("BACKEND RESPONSE:", error.response?.data)

      alert(
        error.response?.data?.detail ||
        "Failed to create property"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-8">

          <p className="text-blue-600 font-semibold text-sm">
            LANDLORD
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            Create a Property
          </h1>

          <p className="text-gray-500 mt-2">
            Add your rental property and make it available
            to potential tenants.
          </p>

        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border
          border-gray-100 p-8">

          <form onSubmit={handleSubmit}>

            {/* Title */}
            <div className="mb-6">

              <label className="block text-sm font-semibold
                text-gray-700 mb-2">
                Property Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Modern 2 Bedroom Apartment"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300
                rounded-lg focus:outline-none focus:ring-2
                focus:ring-blue-500 focus:border-transparent"
              />

            </div>

            {/* Description */}
            <div className="mb-6">

              <label className="block text-sm font-semibold
                text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                placeholder="Describe the property..."
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300
                rounded-lg focus:outline-none focus:ring-2
                focus:ring-blue-500 focus:border-transparent
                resize-none"
              />

            </div>

            {/* Price + Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Price */}
              <div>

                <label className="block text-sm font-semibold
                  text-gray-700 mb-2">
                  Monthly Rent
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-3
                    text-gray-500 font-semibold">
                    R
                  </span>

                  <input
                    type="number"
                    name="price"
                    placeholder="5000"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full pl-9 pr-4 py-3
                    border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2
                    focus:ring-blue-500 focus:border-transparent"
                  />

                </div>

              </div>

              {/* Location */}
              <div>

                <label className="block text-sm font-semibold
                  text-gray-700 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Cape Town"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border
                  border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2
                  focus:ring-blue-500 focus:border-transparent"
                />

              </div>

            </div>

            {/* Images */}
            <div className="mt-8">

              <label className="block text-sm font-semibold
                text-gray-700 mb-2">
                Property Photos
              </label>

              <p className="text-sm text-gray-500 mb-4">
                Upload multiple photos and select one as the
                main profile image.
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full px-4 py-3 border
                border-gray-300 rounded-lg
                bg-white cursor-pointer
                focus:outline-none focus:ring-2
                focus:ring-blue-500"
              />

            </div>

            {/* Image previews */}
            {images.length > 0 && (
              <div className="mt-6">

                <div className="flex justify-between items-center mb-4">

                  <h3 className="font-semibold text-gray-800">
                    Selected Photos
                  </h3>

                  <span className="text-sm text-gray-500">
                    {images.length} photo{images.length !== 1 ? "s" : ""}
                  </span>

                </div>

                <p className="text-sm text-blue-600 mb-4">
                  Click a photo to make it the profile image.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                  {images.map((image, index) => {

                    const imageUrl = URL.createObjectURL(image)
                    const isProfile = index === profileImageIndex

                    return (
                      <div
                        key={`${image.name}-${index}`}
                        onClick={() => setProfileImageIndex(index)}
                        className={`relative cursor-pointer rounded-xl
                          overflow-hidden border-4 transition-all
                          ${
                            isProfile
                              ? "border-blue-600 shadow-lg"
                              : "border-transparent hover:border-blue-300"
                          }`}
                      >

                        <img
                          src={imageUrl}
                          alt={`Property ${index + 1}`}
                          className="w-full h-40 object-cover"
                        />

                        {/* Profile badge */}
                        {isProfile && (
                          <div className="absolute top-2 left-2
                            bg-blue-600 text-white text-xs
                            font-bold px-3 py-1 rounded-full
                            shadow">
                            PROFILE IMAGE
                          </div>
                        )}

                        {/* Photo number */}
                        <div className="absolute bottom-2 right-2
                          bg-black/60 text-white text-xs
                          px-2 py-1 rounded">
                          {index + 1}
                        </div>

                      </div>
                    )
                  })}

                </div>

              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              <button
                type="button"
                onClick={() => navigate("/properties")}
                className="w-full sm:w-auto px-6 py-3
                border border-gray-300 rounded-lg
                font-semibold text-gray-700
                hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3
                bg-blue-600 text-white rounded-lg
                font-semibold hover:bg-blue-700
                disabled:opacity-50 transition"
              >
                {loading ? "Creating..." : "Create Property"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  )
}

export default CreateProperty

