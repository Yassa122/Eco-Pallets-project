import React, { useState, useEffect, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
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
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/user-info/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setFormData(data);
      } else {
        throw new Error(data.message || 'Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Fetching error:', error);
    }
  };

  const fetchShippingAddresses = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/user-info/addresses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setShippingAddresses(data);
        setShowMenu(new Array(data.length).fill(false));
      } else {
        throw new Error(data.message || 'Failed to fetch shipping addresses');
      }
    } catch (error) {
      console.error('Fetching error:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedAddress((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/user-info/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setIsEditing(false);
      } else {
        throw new Error(data.message || 'Failed to update user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
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
    setShowMenu(prev => {
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
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/user-info/delete-address', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ _id: addressId }),
      });

      const data = await response.json();
      if (response.ok) {
        setShippingAddresses(prev => prev.filter(addr => addr._id !== addressId));
      } else {
        throw new Error(data.message || 'Failed to delete shipping address');
      }
    } catch (error) {
      console.error('Error deleting shipping address:', error);
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/user-info/update-address', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(selectedAddress),
      });

      const data = await response.json();
      if (response.ok) {
        setShippingAddresses(prev =>
          prev.map(addr => (addr._id === selectedAddress._id ? selectedAddress : addr))
        );
        closeModal();
      } else {
        throw new Error(data.message || 'Failed to update shipping address');
      }
    } catch (error) {
      console.error('Error updating shipping address:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAddress(null);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8">
        <div className="row">
          <div className="profile-nav col-md-3">
            <div className="panel bg-gray-800">
              <div className="user-heading round">
                <a href="#">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0POWS_SpHqCPzYyvBn87ooiZnXfsENQ4jmIbnKFTj1w&s" alt="User" />
                </a>
                <h1>{user.firstName} {user.lastName}</h1>
                <p>{user.email}</p>
              </div>
              <ul className="nav nav-pills nav-stacked">
                <li className={!isEditing && !showAddresses ? 'active' : ''}>
                  <a href="#" className="button-4" onClick={handleShowProfile}>
                    <i className="fa fa-user"></i> Profile
                  </a>
                </li>
                <li className={isEditing ? 'active' : ''}>
                  <a href="#" className="button-4" onClick={handleEditProfile}>
                    <i className="fa fa-edit"></i> Edit Profile
                  </a>
                </li>
                <li className={showAddresses ? 'active' : ''}>
                  <a href="#" className="button-4" onClick={handleShowAddresses}>
                    <i className="fa fa-address-book"></i> Shipping Addresses
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="profile-info col-md-9">
            {isEditing ? (
              <div className="panel bg-gray-800">
                <div className="panel-body bio-graph-info">
                  <h1>Edit Profile</h1>
                  <form onSubmit={handleSave}>
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input type="text" className="form-control bg-gray-700 text-white" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input type="text" className="form-control bg-gray-700 text-white" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" className="form-control bg-gray-700 text-white" id="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input type="tel" className="form-control bg-gray-700 text-white" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </div>
                    <div className="text-right">
                      <button type="submit" className="button-4">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              showAddresses ? (
                <div className="panel bg-gray-800">
                  <div className="panel-body bio-graph-info">
                    <h1>Shipping Addresses</h1>
                    {shippingAddresses.length === 0 ? (
                      <p>No shipping addresses found.</p>
                    ) : (
                      <ul>
                        {shippingAddresses.map((address, index) => (
                          <li key={index} className="address-item">
                            <div className="address-content">
                              <p><strong>{address.label}</strong></p>
                              <p>{address.address}, {address.city}, {address.postalCode}, {address.country}</p>
                            </div>
                            <button className="meatball-button" onClick={() => toggleMenu(index)}>•••</button>
                            {showMenu[index] && (
                              <div className="meatball-menu">
                                <button onClick={() => handleEditAddress(address)}>Edit</button>
                                <button onClick={() => handleDeleteAddress(address._id)}>Delete</button>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ) : (
                <div className="panel bg-gray-800">
                  <div className="bio-graph-heading"></div>
                  <div className="panel-body bio-graph-info">
                    <h1>Profile Info</h1>
                    <div className="row">
                      <div className="bio-row">
                        <p><span>First Name </span>: {user.firstName}</p>
                      </div>
                      <div className="bio-row">
                        <p><span>Last Name </span>: {user.lastName}</p>
                      </div>
                      <div className="bio-row">
                        <p><span>Email </span>: {user.email}</p>
                      </div>
                      <div className="bio-row">
                        <p><span>Phone Number </span>: {user.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Edit Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAddress && (
            <form onSubmit={handleSaveAddress} className="bg-gray-800 p-4 rounded">
              <div className="form-group">
                <label htmlFor="label" className="text-white">Label</label>
                <input type="text" className="form-control bg-black text-white" id="label" name="label" value={selectedAddress.label} onChange={handleAddressChange} />
              </div>
              <div className="form-group">
                <label htmlFor="address" className="text-white">Address</label>
                <input type="text" className="form-control bg-black text-white" id="address" name="address" value={selectedAddress.address} onChange={handleAddressChange} />
              </div>
              <div className="form-group">
                <label htmlFor="city" className="text-white">City</label>
                <input type="text" className="form-control bg-black text-white" id="city" name="city" value={selectedAddress.city} onChange={handleAddressChange} />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode" className="text-white">Postal Code</label>
                <input type="text" className="form-control bg-black text-white" id="postalCode" name="postalCode" value={selectedAddress.postalCode} onChange={handleAddressChange} />
              </div>
              <div className="form-group">
                <label htmlFor="country" className="text-white">Country</label>
                <input type="text" className="form-control bg-black text-white" id="country" name="country" value={selectedAddress.country} onChange={handleAddressChange} />
              </div>
              <div className="form-group text-right">
                <button type="submit" className="button-4 bg-gray-700 text-white px-4 py-2 rounded">Save</button>
              </div>
            </form>
          )}
        </Modal.Body>
      </Modal>

      <style jsx>{`
        .profile-nav, .profile-info {
          margin-top: 30px;
        }

        .profile-nav .user-heading {
          background: #2c8b87;
          color: #d1d1d1;
          border-radius: 4px 4px 0 0;
          padding: 30px;
          text-align: center;
        }

        .profile-nav .user-heading.round a {
          border-radius: 50%;
          border: 10px solid rgba(255, 255, 255, 0.3);
          display: inline-block;
        }

        .profile-nav .user-heading a img {
          width: 112px;
          height: 112px;
          border-radius: 50%;
        }

        .profile-nav .user-heading h1 {
          font-size: 22px;
          font-weight: 300;
          margin-bottom: 5px;
        }

        .profile-nav .user-heading p {
          font-size: 12px;
        }

        .profile-nav ul {
          margin-top: 1px;
        }

        .profile-nav ul > li {
          border-bottom: 1px solid #383838;
          margin-top: 0;
          line-height: 30px;
        }

        .profile-nav ul > li:last-child {
          border-bottom: none;
        }

        .profile-nav ul > li > a {
          border-radius: 0;
          color: #b3b3b3;
          border-left: 5px solid #000000;
          background: #1f1f1f;
          display: block;
        }

        .profile-nav ul > li > a:hover, .profile-nav ul > li > a:focus, .profile-nav ul li.active a {
          background: #2c8b87;
          border-left: 5px solid #2c8b87;
          color: #d1d1d1 !important;
        }

        .profile-nav ul > li:last-child > a:last-child {
          border-radius: 0 0 4px 4px;
        }

        .profile-nav ul > li > a > i {
          font-size: 16px;
          padding-right: 10px;
          color: #b3b3b3;
        }

        .nav-stacked {
          display: flex;
          flex-direction: column;
        }

        .profile-info .panel {
          background-color: #1f1f1f;
          border-radius: 4px;
          box-shadow: 0 1px 1px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }

        .panel-body {
          padding: 15px;
        }

        .bio-graph-heading {
          background: #2c8b87;
          color: #d1d1d1;
          text-align: center;
          font-style: italic;
          padding: 40px 110px;
          border-radius: 4px 4px 0 0;
          font-size: 16px;
          font-weight: 300;
        }

        .bio-graph-info {
          color: #b3b3b3;
          padding: 20px;
          border-radius: 0 0 4px 4px;
        }

        .bio-graph-info h1 {
          font-size: 22px;
          font-weight: 300;
          margin: 0 0 20px;
        }

        .bio-row {
          width: 50%;
          float: left;
          margin-bottom: 10px;
          padding: 0 15px;
        }

        .bio-row p span {
          width: 100px;
          display: inline-block;
        }

        .address-item {
          position: relative;
          padding: 15px;
          border: 1px solid #383838;
          border-radius: 4px;
          margin-bottom: 15px;
        }

        .address-content {
          padding-right: 40px; /* Space for the meatball menu button */
        }

        .meatball-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .meatball-menu {
          position: absolute;
          top: 30px;
          right: 10px;
          background: #1f1f1f;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-radius: 5px;
          padding: 10px;
          z-index: 100;
        }

        .meatball-menu button {
          display: block;
          background: none;
          border: none;
          padding: 10px;
          cursor: pointer;
          width: 100%;
          text-align: left;
          color: #d1d1d1;
        }

        .meatball-menu button:hover {
          background: #2c2c2c;
        }

        .button-4 {
          appearance: none;
          background-color: #2c8b87;
          border: 1px solid rgba(27, 31, 35, 0.15);
          border-radius: 6px;
          box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
          box-sizing: border-box;
          color: #ffffff;
          cursor: pointer;
          display: inline-block;
          font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          list-style: none;
          padding: 10px 16px;
          position: relative;
          transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
          vertical-align: middle;
          white-space: nowrap;
          word-wrap: break-word;
          margin-left: auto; /* Align button to the right */
        }

        .button-4:hover {
          background-color: #247f79;
          text-decoration: none;
          transition-duration: 0.1s;
        }

        .button-4:disabled {
          background-color: #FAFBFC;
          border-color: rgba(27, 31, 35, 0.15);
          color: #959DA5;
          cursor: default;
        }

        .button-4:active {
          background-color: #247f79;
          box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
          transition: none 0s;
        }

        .button-4:focus {
          outline: 1px transparent;
        }

        .button-4:before {
          display: none;
        }

        .button-4:-webkit-details-marker {
          display: none;
        }

        .modal-content {
          background-color: #1f1f1f;
          color: #d1d1d1;
        }

        .modal-header, .modal-footer {
          border-color: #383838;
        }

        .form-control {
          background-color: #000000;
          color: #d1d1d1;
          border: 1px solid #383838;
        }

        .form-control:focus {
          background-color: #1f1f1f;
          color: #d1d1d1;
          border-color: #2c8b87;
        }

        .btn-primary {
          background-color: #2c8b87;
          border-color: #2c8b87;
        }

        .btn-primary:hover {
          background-color: #247f79;
          border-color: #247f79;
        }

        .btn-primary:focus {
          background-color: #247f79;
          border-color: #247f79;
          box-shadow: 0 0 0 0.2rem rgba(44, 139, 135, 0.5);
        }

        .form-group label {
          color: #d1d1d1;
        }

        .form-group {
          background-color: #1f1f1f;
          border-radius: 4px;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default Profile;
