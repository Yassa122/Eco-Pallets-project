import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal } from "react-bootstrap";
import {
  FaUser,
  FaEdit,
  FaAddressBook,
  FaStar,
  FaEllipsisV,
} from "react-icons/fa";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [shippingAddresses, setShippingAddresses] = useState<any[]>([]);
  const [showMenu, setShowMenu] = useState<boolean[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8000/account/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setFormData(data);
      } else {
        throw new Error(data.message || "Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  const fetchShippingAddresses = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:8000/account/user-info/addresses",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        setShippingAddresses(data);
        setShowMenu(new Array(data.length).fill(false));
      } else {
        throw new Error(data.message || "Failed to fetch shipping addresses");
      }
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedAddress((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:8000/account/user-info/update-address",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setIsEditing(false);
      } else {
        throw new Error(data.message || "Failed to update user profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleShowAddresses = () => {
    if (!showAddresses) {
      fetchShippingAddresses();
    }
    setIsEditing(false);
    setShowAddresses(!showAddresses);
  };

  const handleShowProfile = () => {
    setIsEditing(false);
    setShowAddresses(false);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setShowAddresses(false);
  };

  const toggleMenu = (index: number) => {
    setShowMenu((prev) => {
      const newShowMenu = [...prev];
      newShowMenu[index] = !newShowMenu[index];
      return newShowMenu;
    });
  };

  const handleEditAddress = (address: any) => {
    setSelectedAddress(address);
    setShowModal(true);
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:8000/account/user-info/delete-address",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ _id: addressId }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setShippingAddresses((prev) =>
          prev.filter((addr) => addr._id !== addressId)
        );
      } else {
        throw new Error(data.message || "Failed to delete shipping address");
      }
    } catch (error) {
      console.error("Error deleting shipping address:", error);
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:8000/account/user-info/update-address",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(selectedAddress),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setShippingAddresses((prev) =>
          prev.map((addr) =>
            addr._id === selectedAddress._id ? selectedAddress : addr
          )
        );
        closeModal();
      } else {
        throw new Error(data.message || "Failed to update shipping address");
      }
    } catch (error) {
      console.error("Error updating shipping address:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAddress(null);
  };

  if (!user) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <div className="bg-gray-800 rounded-lg p-4 shadow-md">
              <div className="text-center mb-4">
                <a href="#">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0POWS_SpHqCPzYyvBn87ooiZnXfsENQ4jmIbnKFTj1w&s"
                    alt="User"
                    className="rounded-full w-28 h-28 mx-auto border-4 border-gray-600"
                  />
                </a>
                <h1 className="text-xl font-bold mt-4">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-sm">{user.email}</p>
              </div>
              <ul className="space-y-2">
                <li
                  className={`${
                    !isEditing && !showAddresses ? "bg-gray-700" : ""
                  } rounded-lg`}
                >
                  <a href="#" className="block p-2" onClick={handleShowProfile}>
                    <FaUser className="inline-block mr-2" /> Profile
                  </a>
                </li>
                <li className={`${isEditing ? "bg-gray-700" : ""} rounded-lg`}>
                  <a href="#" className="block p-2" onClick={handleEditProfile}>
                    <FaEdit className="inline-block mr-2" /> Edit Profile
                  </a>
                </li>
                <li
                  className={`${showAddresses ? "bg-gray-700" : ""} rounded-lg`}
                >
                  <a
                    href="#"
                    className="block p-2"
                    onClick={handleShowAddresses}
                  >
                    <FaAddressBook className="inline-block mr-2" /> Shipping
                    Addresses
                  </a>
                </li>
                <li className="rounded-lg">
                  <a
                    href="http://localhost:3000/pages/profile/reviews"
                    className="block p-2"
                  >
                    <FaStar className="inline-block mr-2" /> Reviews
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            {isEditing ? (
              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="mb-4">
                  <h1 className="text-xl font-bold">Edit Profile</h1>
                  <form onSubmit={handleSave}>
                    <div className="mb-4">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-white"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        className="block w-full mt-1 p-2 bg-gray-700 text-white rounded-lg"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-white"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="block w-full mt-1 p-2 bg-gray-700 text-white rounded-lg"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="block w-full mt-1 p-2 bg-gray-700 text-white rounded-lg"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-white"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="block w-full mt-1 p-2 bg-gray-700 text-white rounded-lg"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="text-right">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : showAddresses ? (
              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="mb-4">
                  <h1 className="text-xl font-bold">Shipping Addresses</h1>
                  {shippingAddresses.length === 0 ? (
                    <p>No shipping addresses found.</p>
                  ) : (
                    <ul>
                      {shippingAddresses.map((address, index) => (
                        <li
                          key={index}
                          className="relative p-4 mb-4 border border-gray-700 rounded-lg"
                        >
                          <div className="pr-10">
                            <p>
                              <strong>{address.label}</strong>
                            </p>
                            <p>
                              {address.address}, {address.city},{" "}
                              {address.postalCode}, {address.country}
                            </p>
                          </div>
                          <button
                            className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded-full"
                            onClick={() => toggleMenu(index)}
                          >
                            <FaEllipsisV />
                          </button>
                          {showMenu[index] && (
                            <div className="absolute top-8 right-2 bg-gray-700 text-white rounded-lg shadow-lg">
                              <button
                                className="block w-full text-left px-4 py-2"
                                onClick={() => handleEditAddress(address)}
                              >
                                Edit
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2"
                                onClick={() => handleDeleteAddress(address._id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="mb-4">
                  <h1 className="text-xl font-bold">Profile Info</h1>
                  <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 mb-4">
                      <p>
                        <span className="font-semibold">First Name: </span>{" "}
                        {user.firstName}
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 mb-4">
                      <p>
                        <span className="font-semibold">Last Name: </span>{" "}
                        {user.lastName}
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 mb-4">
                      <p>
                        <span className="font-semibold">Email: </span>{" "}
                        {user.email}
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 mb-4">
                      <p>
                        <span className="font-semibold">Phone Number: </span>{" "}
                        {user.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAddress && (
            <form
              onSubmit={handleSaveAddress}
              className="bg-gray-800 p-4 rounded-lg"
            >
              <div className="mb-4">
                <label
                  htmlFor="label"
                  className="block text-sm font-medium text-white"
                >
                  Label
                </label>
                <input
                  type="text"
                  className="block w-full mt-1 p-2 bg-black text-white rounded-lg"
                  id="label"
                  name="label"
                  value={selectedAddress.label}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  className="block w-full mt-1 p-2 bg-black text-white rounded-lg"
                  id="address"
                  name="address"
                  value={selectedAddress.address}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-white"
                >
                  City
                </label>
                <input
                  type="text"
                  className="block w-full mt-1 p-2 bg-black text-white rounded-lg"
                  id="city"
                  name="city"
                  value={selectedAddress.city}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-white"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  className="block w-full mt-1 p-2 bg-black text-white rounded-lg"
                  id="postalCode"
                  name="postalCode"
                  value={selectedAddress.postalCode}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-white"
                >
                  Country
                </label>
                <input
                  type="text"
                  className="block w-full mt-1 p-2 bg-black text-white rounded-lg"
                  id="country"
                  name="country"
                  value={selectedAddress.country}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
