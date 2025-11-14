import { useState, useEffect } from 'react';
import { AlertCircle, Phone, MapPin, Users, X, Shield, Share2, Navigation, Clock } from 'lucide-react';

const EmergencySOS = () => {
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [emergencyTriggered, setEmergencyTriggered] = useState(false);
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  // Mock emergency contacts
  const emergencyContacts = [
    { id: 1, name: 'Sarah Johnson', relation: 'Emergency Contact 1', phone: '+1 (555) 123-4567' },
    { id: 2, name: 'Michael Davis', relation: 'Emergency Contact 2', phone: '+1 (555) 987-6543' }
  ];

  // Mock ride data
  const currentRide = {
    id: 'RD145',
    driver: { name: 'John Smith', phone: '+1 (555) 234-5678', vehicle: 'Toyota Camry - ABC 123' },
    pickup: '123 Main Street, Downtown',
    destination: '456 Oak Avenue, Uptown'
  };

  // Get current location
  const getCurrentLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocation({
            lat: 40.7128,
            lng: -74.0060,
            accuracy: 0,
            error: 'Unable to get precise location'
          });
          setLoadingLocation(false);
        }
      );
    } else {
      setLocation({
        lat: 40.7128,
        lng: -74.0060,
        accuracy: 0,
        error: 'Geolocation not supported'
      });
      setLoadingLocation(false);
    }
  };

  // Countdown effect for emergency trigger
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      handleEmergencyAction(selectedAction);
    }
  }, [countdown, selectedAction]);

  const openSOSModal = () => {
    setShowSOSModal(true);
    getCurrentLocation();
  };

  const closeSOSModal = () => {
    setShowSOSModal(false);
    setEmergencyTriggered(false);
    setCountdown(null);
    setSelectedAction(null);
  };

  const initiateEmergency = (action) => {
    setSelectedAction(action);
    setCountdown(5); // 5 second countdown
  };

  const cancelEmergency = () => {
    setCountdown(null);
    setSelectedAction(null);
  };

  const handleEmergencyAction = (action) => {
    setEmergencyTriggered(true);
    setCountdown(null);

    // Simulate emergency actions
    switch (action) {
      case 'police':
        console.log('Calling emergency services (911)...');
        // In production: window.location.href = 'tel:911';
        break;
      case 'contacts':
        console.log('Notifying emergency contacts...');
        // In production: Send SMS/notifications to contacts
        notifyEmergencyContacts();
        break;
      case 'location':
        console.log('Sharing live location...');
        // In production: Share location via SMS/WhatsApp
        shareLocation();
        break;
      default:
        break;
    }
  };

  const notifyEmergencyContacts = () => {
    const message = `EMERGENCY ALERT: I need help! My current location is: https://maps.google.com/?q=${location?.lat},${location?.lng}. Ride ID: ${currentRide.id}`;
    
    emergencyContacts.forEach(contact => {
      // In production, use SMS API or WhatsApp API
      console.log(`Sending to ${contact.name}: ${message}`);
      // Example: window.open(`sms:${contact.phone}?body=${encodeURIComponent(message)}`);
    });
  };

  const shareLocation = () => {
    const locationUrl = `https://maps.google.com/?q=${location?.lat},${location?.lng}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Emergency Location Share',
        text: `EMERGENCY: I need help! Current location and ride details.`,
        url: locationUrl
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(locationUrl);
      console.log('Location URL copied to clipboard');
    }
  };

  const callPolice = () => {
    window.location.href = 'tel:911';
  };

  return (
    <>
      {/* Floating SOS Button */}
      <button
        onClick={openSOSModal}
        className="fixed bottom-8 cursor-pointer right-8 z-40 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse"
        aria-label="Emergency SOS"
      >
        <Shield className="w-8 h-8" />
      </button>

      {/* SOS Modal */}
      {showSOSModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-red-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white bg-opacity-20 rounded-full">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Emergency SOS</h2>
                    <p className="text-sm text-red-100">Help is one tap away</p>
                  </div>
                </div>
                <button
                  onClick={closeSOSModal}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Countdown Overlay */}
            {countdown !== null && (
              <div className="bg-yellow-50 border-b-4 border-yellow-400 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-yellow-600 animate-pulse" />
                    <div>
                      <p className="font-bold text-yellow-900">Emergency Action in Progress</p>
                      <p className="text-sm text-yellow-700">Activating in {countdown} seconds...</p>
                    </div>
                  </div>
                  <button
                    onClick={cancelEmergency}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Success Message */}
            {emergencyTriggered && (
              <div className="bg-green-50 border-b-4 border-green-400 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-green-900">Emergency Action Completed</p>
                    <p className="text-sm text-green-700">
                      {selectedAction === 'police' && 'Emergency services have been contacted'}
                      {selectedAction === 'contacts' && 'Your emergency contacts have been notified'}
                      {selectedAction === 'location' && 'Your location has been shared'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Warning Message */}
              <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-900">Emergency Feature</p>
                    <p className="text-sm text-red-700 mt-1">
                      Use this feature only in genuine emergencies. False alarms may result in consequences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Location */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#688D67]" />
                  Current Location
                </h3>
                {loadingLocation ? (
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-4 h-4 border-2 border-[#688D67] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Getting your location...</span>
                  </div>
                ) : location ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Coordinates:</span>
                      <span className="text-sm font-mono text-gray-900">
                        {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                      </span>
                    </div>
                    {location.error && (
                      <p className="text-xs text-yellow-600">{location.error}</p>
                    )}
                    <a
                      href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[#688D67] hover:text-[#5a7a59] font-medium"
                    >
                      <Navigation className="w-4 h-4" />
                      View on Google Maps
                    </a>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">Location unavailable</p>
                )}
              </div>

              {/* Current Ride Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Current Ride Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Ride ID</p>
                    <p className="font-semibold text-gray-900">#{currentRide.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Driver</p>
                    <p className="font-medium text-gray-900">{currentRide.driver.name}</p>
                    <p className="text-sm text-gray-600">{currentRide.driver.vehicle}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#688D67] rounded-full mt-1.5 flex-shrink-0"></div>
                      <div>
                        <p className="text-xs text-gray-500">Pickup</p>
                        <p className="text-sm text-gray-900">{currentRide.pickup}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <div>
                        <p className="text-xs text-gray-500">Destination</p>
                        <p className="text-sm text-gray-900">{currentRide.destination}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Actions */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Emergency Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Call Police */}
                  <button
                    onClick={() => initiateEmergency('police')}
                    disabled={countdown !== null}
                    className="flex flex-col items-center gap-3 p-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-xl transition-colors shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                  >
                    <div className="p-3 bg-white bg-opacity-20 rounded-full">
                      <Phone className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold">Call Police</p>
                      <p className="text-xs opacity-90 mt-1">Dial emergency services</p>
                    </div>
                  </button>

                  {/* Notify Contacts */}
                  <button
                    onClick={() => initiateEmergency('contacts')}
                    disabled={countdown !== null}
                    className="flex flex-col items-center gap-3 p-6 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white rounded-xl transition-colors shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                  >
                    <div className="p-3 bg-white bg-opacity-20 rounded-full">
                      <Users className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold">Notify Contacts</p>
                      <p className="text-xs opacity-90 mt-1">Alert emergency contacts</p>
                    </div>
                  </button>

                  {/* Share Location */}
                  <button
                    onClick={() => initiateEmergency('location')}
                    disabled={countdown !== null}
                    className="flex flex-col items-center gap-3 p-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl transition-colors shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                  >
                    <div className="p-3 bg-white bg-opacity-20 rounded-full">
                      <Share2 className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold">Share Location</p>
                      <p className="text-xs opacity-90 mt-1">Send live location</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Emergency Contacts List */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#688D67]" />
                  Emergency Contacts
                </h3>
                <div className="space-y-3">
                  {emergencyContacts.map(contact => (
                    <div key={contact.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.relation}</p>
                      </div>
                      <a
                        href={`tel:${contact.phone}`}
                        className="flex items-center gap-2 px-3 py-2 bg-[#688D67] text-white rounded-lg hover:bg-[#5a7a59] transition-colors text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        Call
                      </a>
                    </div>
                  ))}
                </div>
                <button className="mt-3 text-sm text-[#688D67] hover:text-[#5a7a59] font-medium">
                  + Add Emergency Contact
                </button>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Safety Tips</p>
                    <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
                      <li>Stay calm and assess the situation</li>
                      <li>Your location is automatically shared when you trigger SOS</li>
                      <li>All emergency actions have a 5-second countdown for accidental prevention</li>
                      <li>You can manage emergency contacts in Settings → Safety</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencySOS;